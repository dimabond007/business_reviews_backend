import { ObjectId } from "mongoose";

export interface ILike extends Document {
  review: ObjectId;
  user: ObjectId;
}
