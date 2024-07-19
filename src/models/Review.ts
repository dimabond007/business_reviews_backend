import { Schema, model } from "mongoose";
import { IReview } from "../types/reviewsTypes";

const reviewSchema = new Schema<IReview>({
  content: { type: String, required: true },
  business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: { type: Number, default: 0 },
});
const Review = model<IReview>("Review", reviewSchema);
export default Review;
