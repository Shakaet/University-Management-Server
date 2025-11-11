
import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { createAcademicDepartmentSchema, updateAcademicDepartmentSchema } from './academicDepartment.jod'
import { createAcademicDepartmentController, findAllAcademicDepartmentController, findOneAcademicDepartmentController, updateAcademicFacultyController } from './academicDepartment.controller'
import { auth } from '../../middleware/auth'
import { user_role } from '../user/user.constrain'





let router = Router()

router.post('/create-acamedic-Department',
    auth(user_role.superAdmin,user_role.admin), 
    // validateRequest(createAcademicDepartmentSchema), 
    createAcademicDepartmentController)

router.get('/allAcademicDepartment',findAllAcademicDepartmentController )
router.get('/AcademicDepartment/:DepartmentId', findOneAcademicDepartmentController)
router.patch('/AcademicDepartment/:DepartmentId',validateRequest(updateAcademicDepartmentSchema), updateAcademicFacultyController)

export let AcamedicDepartmentRoutes = router
