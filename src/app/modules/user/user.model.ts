import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../../config";

const userSchema = new Schema<IUser,UserModel>(
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
      select: false
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

userSchema.pre('save',async function(next){
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
  next()
})

userSchema.statics.isUserExist= async function(id:string):Promise<Partial<IUser> | null>{
  const user = await User.findById(id, { _id: 1, password: 1, needsPasswordChange: 1, role: 1 }).lean();
  return user;
}

userSchema.statics.isPasswordExist= async function(givenPassword:string,savedPassword:string):Promise<boolean>{
    const isPasswordMatch = await bcrypt.compare(givenPassword,savedPassword)
    return isPasswordMatch;
}

export const User = model<IUser, UserModel>("User", userSchema);

