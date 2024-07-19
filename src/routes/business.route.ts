import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllBusiness,
  getReviewsByBusinessId,
  updateReview,
} from "../controllers/business.constroller";

const businessRouter = Router();
businessRouter.get("/", getAllBusiness);
businessRouter.get("/:id/reviews/", getReviewsByBusinessId);
businessRouter.post("/:id/reviews/", createReview);
businessRouter.patch("/:id/reviews", updateReview);
businessRouter.delete("/:id/reviews/:reviewId", deleteReview);

export default businessRouter;
