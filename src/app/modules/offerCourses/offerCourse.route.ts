import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"

import { createOfferedCoursesController } from "./offerCourse.controller"
import { createOfferedCourseValidationSchema } from "./offerCourse.zod"






let router = Router()

router.post('/create-offered-Course',
    validateRequest(createOfferedCourseValidationSchema),
     createOfferedCoursesController)

// router.get('/allCourses',findAllCoursesController )
// router.get('/:courseId', findOneCoursesController)




export let offerCouresRoutes=router