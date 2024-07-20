import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllBusiness,
  getReviewsByBusinessId,
  toggleLike,
  updateReview,
} from "../controllers/business.constroller";
import { verifyToken } from "../middleware/auth.middleware";

const businessRouter = Router();
businessRouter.get("/", getAllBusiness);
businessRouter.patch("/review/:id/", updateReview);
businessRouter.get("/review/:id/like", verifyToken, toggleLike);
businessRouter.get("/:id/reviews/", getReviewsByBusinessId);
businessRouter.post("/:id/reviews/", createReview);
businessRouter.delete("/:id/reviews/:reviewId", deleteReview);

export default businessRouter;
