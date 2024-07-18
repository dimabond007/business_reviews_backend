import { Schema, model, Document, Types } from "mongoose";
interface ILike extends Document {
  review: Types.ObjectId;
  user: Types.ObjectId;
}
const likeSchema = new Schema<ILike>({
  review: { type: Schema.Types.ObjectId, ref: "Review", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const Like = model<ILike>("Like", likeSchema);
export default Like;
