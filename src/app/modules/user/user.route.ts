import express, { NextFunction, Request } from 'express'
import { createAdmin, createFaculty, createStudent } from './user.controller'
import { ZodObject } from 'zod'
import { studentZodSchema } from '../student/validation.jod'
import { validateRequest } from '../../middleware/validateRequest'
import { createFacultyZodSchema } from '../faculty/validation.zod'
import { createAdminSchema } from '../admin/validation.zod'

const router = express.Router()

// will call controller function
router.post('/create-student', validateRequest(studentZodSchema), createStudent)
router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminSchema),
   createAdmin,
);


export const userRoutes = router
