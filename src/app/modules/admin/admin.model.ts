import mongoose, { Schema, model } from 'mongoose';
import { AdminlModel, IAdmin } from './admin.interface';
import bcrypt from 'bcrypt'
import config from '../../../config';

const AdminSchema = new Schema<IAdmin>(
    {
      phoneNumber: { type: String, required: true, unique: true },
      role: { type: String, required: true, default: 'admin' },
      password: { type: String, required: true,select: 0 },
      name: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      address: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON:{
            virtuals:true
        } 
    }
  );


  AdminSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
    next()
  })
export const Admin = model<IAdmin, AdminlModel>("Admin", AdminSchema);
