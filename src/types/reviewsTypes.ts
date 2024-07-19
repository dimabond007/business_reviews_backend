import { Types } from "mongoose";
import { ObjectId } from "mongoose";

export interface IReview extends Document {
  content: string;
  business: Types.ObjectId;
  user: Types.ObjectId;
  likes: number;
}
