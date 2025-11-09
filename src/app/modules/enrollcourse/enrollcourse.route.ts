import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { createEnrolledCourseValidationZodSchema, updateEnrolledCourseMarksValidationZodSchema } from './enrollcourse.zod';
import { createEnrolledCourse, updateEnrolledCourseMarks } from './enrollcourse.controller';


const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
   createEnrolledCourseValidationZodSchema,
  ),
  createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    updateEnrolledCourseMarksValidationZodSchema,
  ),
  updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;