import { Schema, model } from "mongoose";
import { ILike } from "../types/likeTypes";

const likeSchema = new Schema<ILike>({
  review: { type: Schema.Types.ObjectId, ref: "Review", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const Like = model<ILike>("Like", likeSchema);
export default Like;
