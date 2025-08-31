import express, { NextFunction, Request } from 'express'
import { createStudent } from './user.controller'
import { ZodObject } from 'zod'
import { studentZodSchema } from '../student/validation.jod'
import { validateRequest } from '../../middleware/validateRequest'

const router = express.Router()

// will call controller function
router.post('/create-student', validateRequest(studentZodSchema), createStudent)

export const userRoutes = router
