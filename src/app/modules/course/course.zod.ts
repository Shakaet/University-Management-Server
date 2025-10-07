import { z } from "zod";

// ----------------- PreRequisite Schema -----------------
const preRequisiteSchema = z.object({
  course: z.string().min(1, "Course ObjectId is required"), // ObjectId string
  isDeleted: z.boolean().optional().default(false),
});

// ----------------- Create Course Validation -----------------
export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").trim(),
    prefix: z.string().min(1, "Prefix is required").trim(),
    code: z.number({ required_error: "Code is required" }),
    credit: z.number({ required_error: "Credit is required" }),
    preRequisite: z.array(preRequisiteSchema).optional().default([]),
    isDeleted: z.boolean().optional()
  }),
});

// ----------------- Update Course Validation -----------------
// export const updateCourseValidationSchema = z.object({
//   body: z.object({
//     title: z.string().trim().optional(),
//     prefix: z.string().trim().optional(),
//     code: z.number().optional(),
//     credit: z.number().optional(),
//     preRequisite: z.array(preRequisiteSchema).optional(),
//   }),
// });



export let assignFacultyZodSchema=z.object({
  body:z.object({
    faculties:z.array(z.string())
  })

})


export const updateCourseValidationSchema = createCourseValidationSchema.partial() // Make all fields optional for update

