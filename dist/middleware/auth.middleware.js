"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
exports.authorizeBusinessOwner = authorizeBusinessOwner;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Business_1 = __importDefault(require("../models/Business")); // Путь к вашей модели Business
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { JWT_SECRET } = process.env;
function verifyToken(req, res, next) {
    const authHeader = req.header("Authorization") || req.header("authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Access denied" });
    }
    let token = authHeader;
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7).trim();
    }
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Verify token
        req.userId = decoded.userId; // Add userId to request object
        next(); // Call next middleware
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid token" });
    }
}
async function authorizeBusinessOwner(req, res, next) {
    const { id: businessId } = req.params;
    try {
        const business = await Business_1.default.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        if (business.user.toString() !== req.userId) {
            return res.status(403).json({ message: "User not authorized" });
        }
        next();
    }
    catch (error) {
        console.error("Error while authorizing business owner", error);
        res.status(500).json({ message: "Server error" });
    }
}
//# sourceMappingURL=auth.middleware.js.map