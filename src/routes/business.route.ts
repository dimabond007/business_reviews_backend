import { Router } from "express";
import {
  getAllBusiness,
  getReviewsByBusinessId,
} from "../controllers/business.constroller";

const businessRouter = Router();
businessRouter.get("/", getAllBusiness);
businessRouter.get("/reviews/:id", getReviewsByBusinessId);

export default businessRouter;
