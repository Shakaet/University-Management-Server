import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { createCourseValidationSchema, updateCourseValidationSchema } from './course.zod'
import { createCoursesController, deletedCoursesController, findAllCoursesController, findOneCoursesController, updateCoursesController } from './course.controller'



let router = Router()

router.post('/create-courses',validateRequest(createCourseValidationSchema), createCoursesController)

router.get('/allCourses',findAllCoursesController )
router.get('/:courseId', findOneCoursesController)
router.delete('/:courseId', deletedCoursesController)

router.patch('/:courseId',validateRequest(updateCourseValidationSchema), updateCoursesController) 

export let CourseRoutes = router
