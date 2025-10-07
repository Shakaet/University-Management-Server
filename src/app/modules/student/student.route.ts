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

const router = express.Router()

// will call controller function

// router.post("/create-student",createStudent)

router.get('/allStudents', getAllStudents)

router.get('/specificStudent/:id', getSpecificStudent)

router.delete('/specificStudent/:id', deletedSpecificStudent)

router.patch('/updateStudent/:id',validateRequest(updatedStudentsZodSchema), updateStudent)

export const studentRoutes = router
