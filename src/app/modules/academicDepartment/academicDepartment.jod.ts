import { z } from "zod";

// Reusable ObjectId validator
export const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);

// CREATE validation (required fields)
export const createAcademicDepartmentSchema = z.object({
  body:z.object({
    name: z.string().trim().min(1),
     academicFaculty: objectId,
  })
});

// UPDATE validation (all optional)
export const updateAcademicDepartmentSchema = z.object({
  body:z.object({
    name: z.string().trim().min(1).optional(),
    academicFaculty: objectId.optional(),
  })
});

