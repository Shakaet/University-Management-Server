import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { changedPasswordValidationSchema, forgetPassswordValidationSchema, loginValidationSchema, refreshTokenValidationSchema } from "./auth.zod";
import { changedPassword, forgetPassword, loginUser, refreshToken } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { user_role } from "../user/user.constrain";





 let router= Router()


 router.post("/login",
    validateRequest(loginValidationSchema),
    loginUser
 )

  router.post("/refresh-token",
  
    validateRequest(refreshTokenValidationSchema),
     refreshToken
 )


  router.post("/changed-password",
   auth(user_role.admin,user_role.student,user_role.faculty),
    validateRequest(changedPasswordValidationSchema),
    changedPassword
 )


 router.post("/forget-password",
   validateRequest(forgetPassswordValidationSchema),
   forgetPassword
 )


 export let authRoute=router