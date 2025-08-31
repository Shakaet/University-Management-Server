import { z } from "zod";

// Zod schema for Academic Faculty
export const academicFacultySchema = z.object({
  name: z.string().min(1), // required and cannot be empty
});


