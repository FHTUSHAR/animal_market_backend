import { Model, Types } from "mongoose";

 export interface IAnimal {
  name: string;
  age: number;
  price: number;
  location: string;
  breed: string;
  weight: number;
  label: "for sale" | "sold"; 
  category: "Dairy" | "Beef"; 
  seller: Types.ObjectId; 
}

export type AnimalModel = Model<IAnimal, Record<string, unknown>>;
