import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"

import { createOfferedCoursesController, getAllOfferCourses } from "./offerCourse.controller"
import { createOfferedCourseValidationSchema } from "./offerCourse.zod"
import { findAllCoursesController } from "../course/course.controller"






let router = Router()

router.post('/create-offered-Course',
    validateRequest(createOfferedCourseValidationSchema),
     createOfferedCoursesController)

router.get('/all-offered-courses',getAllOfferCourses )
// router.get('/:courseId', findOneCoursesController)




export let offerCouresRoutes=router