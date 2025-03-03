import { z } from 'zod';

const adminSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "Phone number is required" }).min(10, "Phone number must be at least 10 digits"),
    role: z.string( { required_error: "Role must be 'admin'" }),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters long"),
    name: z.object({
      firstName: z.string({ required_error: "First name is required" }),
      middleName: z.string().optional(),
      lastName: z.string({ required_error: "Last name is required" }),
    }),
    address: z.string({ required_error: "Address is required" }),
  }),
});

const updateAdminSchema = z.object({
    body: z.object({
      phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").optional(),
      role: z.string().optional(),
      password: z.string().min(6, "Password must be at least 6 characters long").optional(),
      name: z.object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      }).optional(),
      address: z.string().optional(),
    }),
  });

  export const ValidationAdminZodSchema = {
    adminSchema,
    updateAdminSchema
  }
