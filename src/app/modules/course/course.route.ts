import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { assignFacultyZodSchema, createCourseValidationSchema, updateCourseValidationSchema } from './course.zod'
import { assignFaculties, assignFacultiesWithCourse, createCoursesController, deletedCoursesController, findAllCoursesController, findOneCoursesController, updateCoursesController } from './course.controller'



let router = Router()

router.post('/create-courses',validateRequest(createCourseValidationSchema), createCoursesController)

router.get('/allCourses',findAllCoursesController )
router.get('/:courseId', findOneCoursesController)
router.delete('/:courseId', deletedCoursesController)

router.patch('/:courseId',validateRequest(updateCourseValidationSchema), updateCoursesController) 

router.put("/:courseId/assign-faculties",validateRequest(assignFacultyZodSchema),assignFacultiesWithCourse)

export let CourseRoutes = router
