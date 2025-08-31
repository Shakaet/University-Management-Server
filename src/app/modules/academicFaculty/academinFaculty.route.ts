import { Router } from 'express'
import {
  createAcademicFacultyController,
  findAllAcademicFacultyController,
  findOneAcademicFacultyController,
  updateAcademicFacultyController,
} from './academicFaculty.controller'

import { validateRequest } from '../../middleware/validateRequest'
import { createAcademicFacultySchema, updateAcademicFacultySchema } from './academicFaculty.jod'

let router = Router()

router.post('/create-acamedic-Faculty',validateRequest(createAcademicFacultySchema), createAcademicFacultyController)

router.get('/allAcademicFacalty',findAllAcademicFacultyController )
router.get('/AcademicFaculty/:FacultyId', findOneAcademicFacultyController)
router.patch('/AcademicFaculty/:FacultyId',validateRequest(updateAcademicFacultySchema), updateAcademicFacultyController)

export let AcamedicFacultyRoutes = router
