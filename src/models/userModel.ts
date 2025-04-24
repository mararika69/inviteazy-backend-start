import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
  profile_picture?: string;
  address?: string;
}

const userSchema: Schema = new Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: false },
    profile_picture: { type: String, required: false },
    address: { type: String, required: false },
  },
  { timestamps: true } // createdAt and updatedAt will be auto-managed
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
