import { Document } from "mongoose";

export interface UserModel extends Document {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
}
