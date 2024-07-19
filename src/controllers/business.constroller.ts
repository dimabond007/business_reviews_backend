import { Request, Response } from "express";
import Business from "../models/Business";
import Review from "../models/Review";
import mongoose, { ObjectId, Types } from "mongoose";

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

export const createReview = async (req: Request, res: Response) => {
  try {
    const businessId = new mongoose.Types.ObjectId(req.params.id);
    const review = new Review(req.body);
    review.business = businessId;
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "createReview: " + err.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {};

export const deleteReview = async (req: Request, res: Response) => {};
