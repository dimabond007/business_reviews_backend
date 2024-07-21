import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllBusiness,
  getBusinessById,
  getReviewsByBusinessId,
  toggleLike,
  updateReview,
} from "../controllers/business.constroller";
import { verifyToken } from "../middleware/auth.middleware";

const businessRouter = Router();
businessRouter.get("/", getAllBusiness);
businessRouter.patch("/review/:id/", updateReview);
businessRouter.get("/review/:id/like", verifyToken, toggleLike);
businessRouter.get("/:id/", getBusinessById);
businessRouter.get("/:id/reviews/", getReviewsByBusinessId);
businessRouter.post("/:id/reviews/", verifyToken, createReview);
businessRouter.delete("/:id/reviews/:reviewId", verifyToken, deleteReview);

export default businessRouter;
