import express from 'express'

import {
  deletedSpecificStudent,
  getAllStudents,
  getSpecificStudent,
  updateStudent,
} from './student.controller'

const router = express.Router()

// will call controller function

// router.post("/create-student",createStudent)

router.get('/allStudents', getAllStudents)

router.get('/specificStudent/:id', getSpecificStudent)

router.delete('/specificStudent/:id', deletedSpecificStudent)

router.patch('/updateStudent/:id', updateStudent)

export const studentRoutes = router
