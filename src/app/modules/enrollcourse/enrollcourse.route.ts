import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { createEnrolledCourseValidationZodSchema, updateEnrolledCourseMarksValidationZodSchema } from './enrollcourse.zod';
import { createEnrolledCourse, updateEnrolledCourseMarks } from './enrollcourse.controller';
import { user_role } from '../user/user.constrain';


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
  auth('faculty',user_role.superAdmin,user_role.admin),
  validateRequest(
    updateEnrolledCourseMarksValidationZodSchema,
  ),
  updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;