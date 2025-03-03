import { Model, ObjectId } from "mongoose";

export type IUser = {
  _id?:ObjectId;
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

// export type UserModel = Model<IUser, Record<string, unknown>>;
export interface UserModel extends Model<IUser> {
  isUserExist(id: string): Promise<Partial<IUser> | null>;
  isPasswordExist(
    givenPassword: string,
    savedPassword: string | null |undefined
  ): Promise<boolean>;
}

