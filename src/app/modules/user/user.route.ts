import express, { NextFunction, Request } from 'express'
import { changedUserStatus, createAdmin, createFaculty, createStudent, getMe } from './user.controller'
import { ZodObject } from 'zod'
import { studentZodSchema } from '../student/validation.jod'
import { validateRequest } from '../../middleware/validateRequest'
import { createFacultyZodSchema } from '../faculty/validation.zod'
import { createAdminSchema } from '../admin/validation.zod'
import { auth } from '../../middleware/auth'
import { user_role } from './user.constrain'
import { changedStatusZodSchema } from './validation.jod'

const router = express.Router()

// will call controller function
router.post('/create-student',auth(user_role.admin), validateRequest(studentZodSchema), createStudent)
router.post(
  '/create-faculty',
  auth(user_role.admin),
  validateRequest(createFacultyZodSchema),
  createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminSchema),
   createAdmin,
);

router.get(
  '/me',
   auth(user_role.admin,user_role.student,user_role.faculty),
   getMe,
);

router.post(
  '/changed-status/:id',
   auth(user_role.admin),
   validateRequest(changedStatusZodSchema),
   changedUserStatus,
);



export const userRoutes = router
