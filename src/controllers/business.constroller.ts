import { Request, Response } from "express";
import Business from "../models/Business";
import Review from "../models/Review";
import mongoose, { ObjectId, Types } from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware";
import Like from "../models/Like";

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

export const toggleLike = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const reviewId = new Types.ObjectId(id);
    const userId = new Types.ObjectId(req.userId);

    console.log("reviewId=", reviewId);
    console.log("userId=", userId);

    const like = await Like.findOne({ review: reviewId, user: userId });

    if (like) {
      await Like.deleteOne({ _id: like._id });
      const likesOfReview = await Like.find({ review: reviewId });
      Review.findByIdAndUpdate(reviewId, { likes: likesOfReview.length });
      res.status(200).json({ message: "Like removed" });
    } else {
      const newLike = new Like({ review: reviewId, user: userId });
      await newLike.save();
      res.status(201).json({ message: "Like added" });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Failed to toggle like" });
  }
};

export const getLikesCountByReviewId = async (
  req: Request,
  res: Response
) => {};
