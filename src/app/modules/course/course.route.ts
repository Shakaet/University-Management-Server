import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { createCourseValidationSchema } from './course.zod'
import { createCoursesController, deletedCoursesController, findAllCoursesController, findOneCoursesController } from './course.controller'



let router = Router()

router.post('/create-courses',validateRequest(createCourseValidationSchema), createCoursesController)

router.get('/allCourses',findAllCoursesController )
router.get('/:courseId', findOneCoursesController)
router.delete('/:courseId', deletedCoursesController)

export let CourseRoutes = router
