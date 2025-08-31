import { z } from 'zod'

// Zod schema for Academic Faculty
export const createAcademicFacultySchema = z.object({
  body:z.object({
    name: z.string().min(1), // required and cannot be empty
  })
})


export const updateAcademicFacultySchema = z.object({
 body:z.object({
     name: z.string().optional(), // required and cannot be empty
 })
})

