import { z } from "zod";

export const userNameSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

export const createAdminSchema = z.object({
  body: z.object({

     password: z.string().max(20),

     admin:z.object({
        
    designation: z.string().min(1, "Designation is required"),
    name: userNameSchema,
    gender: z.enum(["male", "female", "other"], {
      required_error: "Gender is required",
    }),
    dateOfBirth: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date().optional()),
    email: z.string().email("Invalid email"),
    contactNo: z.string().min(1, "Contact number is required"),
    emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
    bloogGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    presentAddress: z.string().min(1, "Present address is required"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
    profileImg: z.string().url("Invalid image URL").optional(),
    isDeleted: z.boolean().default(false),})

    
  }),
});


export const updateAdminSchema = z.object({
  body: z.object({
    // id: z.string().optional(),
    // user: z.string().optional(),

    admin: z.object({
      designation: z.string().optional(),
    name: userNameSchema.partial().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: z
      .preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date())
      .optional(),
    email: z.string().email("Invalid email").optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().url("Invalid image URL").optional(),
    isDeleted: z.boolean().optional(),
    })
    
  }),
});
