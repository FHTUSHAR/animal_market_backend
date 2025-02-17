import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON:{
        virtuals:true
    } 
  }
);

export const User = model<IUser, UserModel>("User", userSchema);

