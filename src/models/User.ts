import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/userTypes";

//nrvjcempo

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imgUrl: { type: String }
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const User = model<IUser>("User", userSchema);
export default User;
