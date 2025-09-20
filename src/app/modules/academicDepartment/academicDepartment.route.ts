import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { createAcademicDepartmentSchema, updateAcademicDepartmentSchema } from './academicDepartment.jod'
import { createAcademicDepartmentController, findAllAcademicDepartmentController, findOneAcademicDepartmentController, updateAcademicFacultyController } from './academicDepartment.controller'





let router = Router()

router.post('/create-acamedic-Department',
    // validateRequest(createAcademicDepartmentSchema), 
    createAcademicDepartmentController)

router.get('/allAcademicDepartment',findAllAcademicDepartmentController )
router.get('/AcademicDepartment/:DepartmentId', findOneAcademicDepartmentController)
router.patch('/AcademicDepartment/:DepartmentId',validateRequest(updateAcademicDepartmentSchema), updateAcademicFacultyController)

export let AcamedicDepartmentRoutes = router
