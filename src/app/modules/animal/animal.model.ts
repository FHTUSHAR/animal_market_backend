import { Schema, model } from "mongoose";
import { AnimalModel, IAnimal } from "./animal.interface";

const AnimalSchema = new Schema<IAnimal>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  breed: { type: String, required: true },
  weight: { type: Number, required: true },
  label: { type: String, enum: ["for sale", "sold"], required: true },
  category: { type: String, enum: ["Dairy", "Beef"], required: true },
  seller: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Animal = model<IAnimal, AnimalModel>("Animal", AnimalSchema);

