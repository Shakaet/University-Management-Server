import { Router } from "express"
import { updateFacultyZodSchema } from "./validation.zod";
import { validateRequest } from "../../middleware/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { auth } from "../../middleware/auth";
import { user_role } from "../user/user.constrain";


const router = Router()



router.get('/faculty/:id',auth(user_role.admin,user_role.superAdmin,user_role.faculty), FacultyControllers.getSingleFaculty);

router.patch(
  '/faculty/:id',
  auth(user_role.admin,user_role.superAdmin),
  validateRequest(updateFacultyZodSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/faculty/:id',auth(user_role.admin,user_role.superAdmin), FacultyControllers.deleteFaculty);

router.get('/faculty',auth(user_role.admin,user_role.superAdmin,user_role.faculty), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router
