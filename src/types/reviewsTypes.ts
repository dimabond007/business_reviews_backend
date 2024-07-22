import { Types } from "mongoose";
import { ILike } from "./likeTypes";

export interface IReview extends Document {
  content: string;
  business: Types.ObjectId;
  user: Types.ObjectId;
  likes: number;
}
