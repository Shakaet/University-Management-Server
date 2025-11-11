import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { assignFacultyZodSchema, createCourseValidationSchema, FacultyZodSchema, updateCourseValidationSchema } from './course.zod'
import { assignFaculties, assignFacultiesWithCourse, createCoursesController, deletedCoursesController, deleteFacultiesWithCourse, findAllCoursesController, findOneCoursesController, updateCoursesController } from './course.controller'
import { user_role } from '../user/user.constrain'
import { auth } from '../../middleware/auth'



let router = Router()

router.post('/create-courses',auth(user_role.admin,user_role.superAdmin),validateRequest(createCourseValidationSchema), createCoursesController)

router.get('/allCourses',
auth(user_role.admin,user_role.superAdmin,user_role.faculty,user_role.student),
findAllCoursesController )
router.get('/:courseId', findOneCoursesController)
router.delete('/:courseId',auth(user_role.admin,user_role.superAdmin), deletedCoursesController)

router.patch('/:courseId',auth(user_role.admin,user_role.superAdmin),validateRequest(updateCourseValidationSchema), updateCoursesController) 

router.put("/:courseId/assign-faculties",auth(user_role.admin,user_role.superAdmin),validateRequest(FacultyZodSchema),assignFacultiesWithCourse)

router.delete("/:courseId/remove-faculties",auth(user_role.admin,user_role.superAdmin),validateRequest(FacultyZodSchema),deleteFacultiesWithCourse)

export let CourseRoutes = router
