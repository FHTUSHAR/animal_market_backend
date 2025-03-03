import { Model } from "mongoose";

export interface IAdmin  {
    phoneNumber: string;
    role: string;
    password: string;
    name:{
        firstName: string;
        middleName: string;
        lastName: string;
    }
    address: string;
  }
export type AdminlModel = Model<IAdmin, Record<string, unknown>>;
  