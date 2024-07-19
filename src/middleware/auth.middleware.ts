import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Business from "../models/Business"; // Путь к вашей модели Business
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

interface AuthRequest extends Request {
  userId?: string;
}

function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  const token =
    typeof authHeader === "string" ? authHeader.split(" ")[1] : null; // Get the token from the header
  console.log(authHeader);
  if (!token) {
    console.log("auth.middleware, verifyToken. No token provided");
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as {
      userId: string;
    };
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call next middleware
  } catch (error) {
    console.log(
      "auth.middleware, verifyToken. Error while verifying token",
      error
    );
    res.status(401).json({ error: "Invalid token" });
  }
}

async function authorizeBusinessOwner(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { id: businessId } = req.params;
  try {
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    if (business.user.toString() !== req.userId) {
      return res.status(403).json({ message: "User not authorized" });
    }

    next();
  } catch (error) {
    console.error("Error while authorizing business owner", error);
    res.status(500).json({ message: "Server error" });
  }
}

export { verifyToken, authorizeBusinessOwner };
