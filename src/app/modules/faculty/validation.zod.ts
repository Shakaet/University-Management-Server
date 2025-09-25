import { z } from "zod";

// Sub-schema for Name
const userNameZodSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

// Gender enum
const genderEnum: ["male", "female", "other"] = ["male", "female", "other"];

// Blood group enum
const bloodGroupEnum: [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

/**
 * ✅ Zod schema for creating Faculty
 */
export const createFacultyZodSchema = z.object({
  body: z.object({
     password: z.string().max(20),
     faculty: z.object({
        //   id: z.string().min(1, "ID is required"),
        // user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
        designation: z.string().min(1, "Designation is required"),
        name: userNameZodSchema,
        gender: z.enum(genderEnum),
        dateOfBirth: z.string().optional(),
        email: z.string().email(),
        contactNo: z.string().min(1, "Contact number is required"),
        emergencyContactNo: z.string().min(1, "Emergency contact is required"),
        bloogGroup: z.enum(bloodGroupEnum).optional(),
        presentAddress: z.string().min(1, "Present address is required"),
        permanentAddress: z.string().min(1, "Permanent address is required"),
        profileImg: z.string().url().optional(),
        academicDepartment: z
          .string()
          .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
        isDeleted: z.boolean().optional(),
     })
    
  }),
});

/**
 * ✅ Zod schema for updating Faculty
 * (all fields optional, for PATCH requests)
 */
export const updateFacultyZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId").optional(),
    designation: z.string().optional(),
    name: userNameZodSchema.partial().optional(),
    gender: z.enum(genderEnum).optional(),
    dateOfBirth: z.string().datetime().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloogGroup: z.enum(bloodGroupEnum).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().url().optional(),
    academicDepartment: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
