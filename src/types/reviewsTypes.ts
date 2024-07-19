import { ObjectId } from "mongoose";

export interface IReview extends Document {
  content: string;
  business: ObjectId;
  user: ObjectId;
  likes: number;
}
