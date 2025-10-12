import { z } from "zod";
import { Types } from "mongoose";

// Create Zod schema for Semester Registration
export const createSemesterRegistrationZodSchema = z.object({
 body:z.object({ 
  academicSemester: z.string({
    required_error: "Academic Semester ID is required",
  }),
  status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).optional(), // default handled by backend
  startDate: z
    .string({
      required_error: "Start date is required",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start date format",
    }),
  endDate: z
    .string({
      required_error: "End date is required",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid end date format",
    }),
  minCredit: z
    .number()
    .min(0)
    .optional()
    .default(3),
  maxCredit: z
    .number()
    .min(0)
    .optional()
    .default(15),
  })
});



export const updateSemesterRegistrationZodSchema = z.object({
  body: z.object({
    academicSemester: z
      .string()
      .refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid academicSemester ObjectId",
      })
      .optional(),
    status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).optional(),
    startDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid startDate format",
      })
      .optional(),
    endDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid endDate format",
      })
      .optional(),
    minCredit: z.number().min(0).optional(),
    maxCredit: z.number().min(0).optional(),
  }),
});

