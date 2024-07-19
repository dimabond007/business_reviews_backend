import { Schema, model, Document, Types } from "mongoose";

interface IBusiness extends Document {
  name: string;
  description: string;
  user: Types.ObjectId;
}

const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Business = model<IBusiness>("Business", businessSchema);
export default Business;
