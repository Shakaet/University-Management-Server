// import { z } from "zod";
// import { Types } from "mongoose";

// const daysEnum = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;

// export const createOfferedCourseZodSchema = z.object({
//     body:z.object({
        
//     semesterRegistration: z.string().refine(val => Types.ObjectId.isValid(val), {
//       message: "Invalid semesterRegistration ObjectId",
//     }),
//     academicFaculty: z.string().refine(val => Types.ObjectId.isValid(val), {
//       message: "Invalid academicFaculty ObjectId",
//     }),
//     academicDepartment: z.string().refine(val => Types.ObjectId.isValid(val), {
//       message: "Invalid academicDepartment ObjectId",
//     }),
//     course: z.string().refine(val => Types.ObjectId.isValid(val), {
//       message: "Invalid course ObjectId",
//     }),
//     faculty: z.string().refine(val => Types.ObjectId.isValid(val), {
//       message: "Invalid faculty ObjectId",
//     }),
//     maxCapacity: z.number({ required_error: "maxCapacity is required" }).min(1),
//     section: z.number({ required_error: "section is required" }).min(1),
//     days: z.array(z.enum(daysEnum)).nonempty({
//       message: "At least one day must be selected",
//     }),
//     startTime: z.string({ required_error: "startTime is required" }),
//     endTime: z.string({ required_error: "endTime is required" }),
//   }),
// })


// export const updateOfferedCourseZodSchema = z.object({
//   body: z.object({
    
//     faculty: z
//       .string()
//       .refine(val => Types.ObjectId.isValid(val), {
//         message: "Invalid faculty ObjectId",
//       })
//       .optional(),
//     maxCapacity: z.number().min(1).optional(),
//     days: z.array(z.enum(daysEnum)).optional(),
//     startTime: z.string().optional(),
//     endTime: z.string().optional(),
//   }),
// });



import { z } from 'zod';


const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);
export const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});

export const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});


