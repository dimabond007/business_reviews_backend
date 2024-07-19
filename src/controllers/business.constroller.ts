import { Request, Response } from "express";
import Business from "../models/Business";
import Review from "../models/Review";

export const getAllBusiness = async (req: Request, res: Response) => {
  try {
    const business = await Business.find({});
    res.status(200).send(business);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "getAllBusiness: " + err.message });
  }
};
export const getReviewsByBusinessId = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;
    const reviews = await Review.find({ business: businessId });
    res.status(200).send(reviews);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "getReviewsByBusinessId: " + err.message });
  }
};
