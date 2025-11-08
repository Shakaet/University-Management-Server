import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { createEnrolledCourseValidationZodSchema } from './enrollcourse.zod';
import { createEnrolledCourse } from './enrollcourse.controller';


const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
   createEnrolledCourseValidationZodSchema,
  ),
  createEnrolledCourse,
);

// router.patch(
//   '/update-enrolled-course-marks',
//   auth('faculty'),
//   validateRequest(
//     EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
//   ),
//   EnrolledCourseControllers.updateEnrolledCourseMarks,
// );

export const EnrolledCourseRoutes = router;