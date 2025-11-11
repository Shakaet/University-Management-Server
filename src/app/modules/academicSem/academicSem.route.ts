import { Router } from 'express'
import {
  createAcademicSemester,
  findAllAcademicSemController,
  findAllAcademinSemController,
  findOneAcademicSemController,
  findOneAcademinSemController,
  updateAcademicSemController,
} from './academicSem.controller'
import { validateRequest } from '../../middleware/validateRequest'
import {
  createAcademicSemesterZod,
  updateAcademicSemesterZod,
} from './academicsemValidate.jod'
import { user_role } from '../user/user.constrain'
import { auth } from '../../middleware/auth'

let router = Router()

router.post(
  '/create-acamedic-sem',
  auth(user_role.admin,user_role.superAdmin),
  validateRequest(createAcademicSemesterZod),
  createAcademicSemester,
)

router.get('/allAcademicSemester',
  auth(user_role.admin,user_role.superAdmin,user_role.faculty,user_role.student),
   findAllAcademicSemController)
router.get('/AcademicSemester/:semesterId',
  auth(user_role.admin,user_role.superAdmin,user_role.faculty,user_role.student),
   findOneAcademicSemController)
router.patch(
  '/AcademicSemester/:semesterId',
  auth(user_role.admin,user_role.superAdmin),
  validateRequest(updateAcademicSemesterZod),
  updateAcademicSemController,
)

export let AcamedicsemRoutes = router
