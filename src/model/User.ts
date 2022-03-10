import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isUserVerified: boolean;
  verifyToken: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  isUserVerified: { type: Boolean, default: false },
  verifyToken: { type: String }
});

export default model<IUser>("User", UserSchema);
