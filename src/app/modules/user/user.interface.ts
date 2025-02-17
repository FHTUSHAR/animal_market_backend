import { Model } from "mongoose";

export type IUser = {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  role?: "buyer" | "seller";
  phoneNumber: string;
  password: string;
  address: string;
  budget?: number;
  income?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

