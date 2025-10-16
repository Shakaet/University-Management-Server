import { Router } from "express"
import { updateFacultyZodSchema } from "./validation.zod";
import { validateRequest } from "../../middleware/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { auth } from "../../middleware/auth";


const router = Router()



router.get('/faculty/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/faculty/:id',
  validateRequest(updateFacultyZodSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/faculty/:id', FacultyControllers.deleteFaculty);

router.get('/faculty',auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router
