import { z } from "zod";

const userSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: "firstName is required" }),
      middleName: z.string().optional(),
      lastName: z.string({ required_error: "lastName is required" }),
    }),
    role: z.enum(["buyer", "seller"], {
      required_error: "role is required",
    }),
    phoneNumber: z.string({ required_error: "Phone number is required" }),
    password: z.string({ required_error: "Password is required" }),
    address: z.string({ required_error: "Address is required" }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidation = { userSchema };
