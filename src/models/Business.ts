import { Schema, model, Document, Types } from "mongoose";

interface IBusiness extends Document {
  name: string;
  description: string;
  user: Types.ObjectId;
  imageUrl: string;
  address: string;
  city: string;
  district: string;
  category: string;
}

const businessSchema = new Schema<IBusiness>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  address: { type: String },
  city: { type: String },
  district: { type: String },
  category: { type: String },
});

const Business = model<IBusiness>("Business", businessSchema);
export default Business;
