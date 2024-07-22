import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  imgUrl: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
