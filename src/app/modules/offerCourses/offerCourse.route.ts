import { Router } from "express"
import { validateRequest } from "../../middleware/validateRequest"

import { createOfferedCoursesController, deletedOfferCourse, findOneOfferCoursesController, getAllOfferCourses, updateOfferCourse } from "./offerCourse.controller"
import { createOfferedCourseValidationSchema, updateOfferedCourseValidationSchema } from "./offerCourse.zod"
import { findAllCoursesController } from "../course/course.controller"






let router = Router()

router.post('/create-offered-Course',
    validateRequest(createOfferedCourseValidationSchema),
     createOfferedCoursesController)

router.get('/all-offered-courses',getAllOfferCourses )
router.get('/:id', findOneOfferCoursesController)


router.patch("/:id",
    validateRequest(updateOfferedCourseValidationSchema),
    updateOfferCourse
)


router.delete(
  '/:id',
   deletedOfferCourse
);




export let offerCouresRoutes=router