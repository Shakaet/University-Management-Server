import { Router } from 'express'
import {
  createAcademicFacultyController,
  findAllAcademicFacultyController,
  findOneAcademicFacultyController,
  updateAcademicFacultyController,
} from './academicFaculty.controller'

import { validateRequest } from '../../middleware/validateRequest'
import { createAcademicFacultySchema, updateAcademicFacultySchema } from './academicFaculty.jod'
import { auth } from '../../middleware/auth'
import { user_role } from '../user/user.constrain'

let router = Router()

router.post('/create-acamedic-Faculty',
  auth(user_role.superAdmin,user_role.admin),
  validateRequest(createAcademicFacultySchema), createAcademicFacultyController)

router.get('/allAcademicFacalty',findAllAcademicFacultyController )
router.get('/AcademicFaculty/:FacultyId', findOneAcademicFacultyController)
router.patch('/AcademicFaculty/:FacultyId',validateRequest(updateAcademicFacultySchema), updateAcademicFacultyController)

export let AcamedicFacultyRoutes = router
