import { z } from "zod";

export const animalSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    age: z.number({ required_error: "Age is required" }),
    price: z.number({ required_error: "Price is required" }),
    location: z.string({ required_error: "Location is required" }),
    breed: z.string({ required_error: "Breed is required" }),
    weight: z.number({ required_error: "Weight is required" }),
    label: z.enum(["for sale", "sold"], { required_error: "Label is required" }),
    category: z.enum(["Dairy", "Beef"], { required_error: "Category is required" }),
    seller: z.string({ required_error: "Name is required" })
  }),
});

export const updateAnimalSchema = z.object({
    body: z.object({
      name: z.string().optional(),
      age: z.number().optional(),
      price: z.number().optional(),
      location: z.string().optional(),
      breed: z.string().optional(),
      weight: z.number().optional(),
      label: z.enum(["for sale", "sold"]).optional(),
      category: z.enum(["Dairy", "Beef"]).optional(),
      seller: z.string().optional(),
    }),
  });
  

export  const AnimaleValidation = {animalSchema, updateAnimalSchema}
