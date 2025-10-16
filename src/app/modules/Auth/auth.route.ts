import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { changedPasswordValidationSchema, loginValidationSchema } from "./auth.zod";
import { changedPassword, loginUser } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { user_role } from "../user/user.constrain";





 let router= Router()


 router.post("/login",
    validateRequest(loginValidationSchema),
    loginUser
 )


  router.post("/changed-password",
   auth(user_role.admin,user_role.student,user_role.faculty),
    validateRequest(changedPasswordValidationSchema),
    changedPassword
 )


 export let authRoute=router