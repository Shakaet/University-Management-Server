import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { updateAdminSchema } from "./validation.zod";
import { AdminControllers } from "./admin.controller";

const router = Router();

router.get('/admin', AdminControllers.getAllAdmins);

router.get('/admin/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/admin/:id',
  validateRequest(updateAdminSchema),
  AdminControllers.updateAdmin,
);

router.delete('/admin/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;