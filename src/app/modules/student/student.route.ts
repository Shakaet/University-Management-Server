import express from 'express'

import {
  assignFaculties,
  deletedSpecificStudent,
  getAllStudents,
  getSpecificStudent,
  updateStudent,
} from './student.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { updatedStudentsZodSchema } from './validation.jod'
import { user_role } from '../user/user.constrain'
import { auth } from '../../middleware/auth'

const router = express.Router()

// will call controller function

// router.post("/create-student",createStudent)

router.get('/allStudents', auth(user_role.admin,user_role.superAdmin),getAllStudents)

router.get('/specificStudent/:id',auth(user_role.admin,user_role.superAdmin), getSpecificStudent)

router.delete('/specificStudent/:id',auth(user_role.admin,user_role.superAdmin), deletedSpecificStudent)

router.patch('/updateStudent/:id',auth(user_role.admin,user_role.superAdmin),validateRequest(updatedStudentsZodSchema), updateStudent)

export const studentRoutes = router
