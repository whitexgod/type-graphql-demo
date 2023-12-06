import mongoose from "mongoose";
import { UserModel } from "../interfaces/userModelInterface";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<UserModel>("users", userSchema);
