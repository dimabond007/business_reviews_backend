import { Request, Response } from "express";
import Business from "../models/Business";
import Review from "../models/Review";
import mongoose, { ObjectId, Types } from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware";
import Like from "../models/Like";
import { io } from "../index"; // Import io from index.ts

export const getAllBusiness = async (req: Request, res: Response) => {
  try {
    const business = await Business.find({});
    res.status(200).send(business);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "getAllBusiness: " + err.message });
  }
};

export const getBusinessById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id);

    console.log("business", business);
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.status(200).json(business);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "getBusinessById: " + err.message });
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

    // Emit event to notify clients about the new review
    io.emit("reviewAdded", review);

    res.status(201).send(review);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "createReview: " + err.message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.id;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });
    res.status(200).send(updatedReview);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "updateReview: " + err.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewId = req.params.reviewId;
    await Review.findByIdAndDelete(reviewId);
    res.status(200).send({ message: "Review deleted successfully" });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: "deleteReview: " + err.message });
  }
};

export const toggleLike = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const reviewId = new Types.ObjectId(id);
    const userId = new Types.ObjectId(req.userId);
    const like = await Like.findOne({ review: reviewId, user: userId });

    if (like) {
      await Like.deleteOne({ _id: like._id });
    } else {
      const newLike = new Like({ review: reviewId, user: userId });
      await newLike.save();
    }

    const likesOfReview = await Like.countDocuments({ review: reviewId });
    await Review.findByIdAndUpdate(reviewId, { likes: likesOfReview });

    // Emit event to notify clients about the like update
    io.emit("reviewLiked", { reviewId, likes: likesOfReview });

    res.status(200).json({ message: like ? "Like removed" : "Like added" });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Failed to toggle like" });
  }
};
