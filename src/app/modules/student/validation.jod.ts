import { z } from "zod";

// Enum schemas with custom messages using refine
const genderEnum = z.enum(["male", "female", "others"]);
const bloodGroupEnum = z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]);
const isActiveEnum = z.enum(["active", "blocked"]);

// Zod schema for Student
export const studentZodSchema = z.object({
  id: z.string().nonempty({ message: "ID is required" }),
  password:z.string().max(20),

  name: z.object({
    firstName: z
      .string()
      .min(2, { message: "First name too small" })
      .refine(
        val => val.charAt(0) === val.charAt(0).toUpperCase(),
        { message: "First name must start with a capital letter" }
      ),
    middleName: z.string().optional(),
    lastName: z
      .string()
      .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters" }),
  }),

  gender: genderEnum.refine(
    val => genderEnum.options.includes(val),
    { message: "Gender is not supported" }
  ),

  dateOfBirth: z.string().optional(),

  email: z.string().email({ message: "Email is not valid" }),

  contactNo: z.string().nonempty({ message: "Contact number is required" }),
  emergencyContactNo: z.string().nonempty({ message: "Emergency contact is required" }),

  bloodGroup: bloodGroupEnum.refine(
    val => bloodGroupEnum.options.includes(val),
    { message: "Blood group is not valid" }
  ),

  presentAddress: z.string().nonempty({ message: "Present address is required" }),
  permanentAddress: z.string().nonempty({ message: "Permanent address is required" }),

  guardian: z.object({
    fatherName: z.string().nonempty({ message: "Father name is required" }),
    fatherOccupation: z.string().nonempty({ message: "Father occupation is required" }),
    fatherContactNo: z.string().nonempty({ message: "Father contact is required" }),
    motherName: z.string().nonempty({ message: "Mother name is required" }),
    motherOccupation: z.string().nonempty({ message: "Mother occupation is required" }),
    motherContactNo: z.string().nonempty({ message: "Mother contact is required" }),
  }),

  localGuardian: z.object({
    name: z.string().nonempty({ message: "Local guardian name is required" }),
    occupation: z.string().nonempty({ message: "Occupation is required" }),
    contactNo: z.string().nonempty({ message: "Contact number is required" }),
    address: z.string().nonempty({ message: "Address is required" }),
  }),

  profileImg: z.string().optional(),
  isActive: isActiveEnum.default("active").refine(
    val => isActiveEnum.options.includes(val),
    { message: "Status must be 'active' or 'blocked'" }
  ),
  isDeleted:z.boolean()
});
