import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { loginValidationSchema } from "./auth.zod";
import { loginUser } from "./auth.controller";





 let router= Router()


 router.post("/login",
    validateRequest(loginValidationSchema),
    loginUser
 )


 export let authRoute=router