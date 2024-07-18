import { Request, Response } from "express";
// import User from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    res.json({ message: `Get a user ${id}` });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
