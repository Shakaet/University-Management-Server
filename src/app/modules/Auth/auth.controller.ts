import { catchAsynFunction } from "../../utils/catchAsync";
import { senResponse } from "../../utils/sendResponse";
import { loginUserServices } from "./auth.service";




export let  loginUser=catchAsynFunction(async(req,res)=>{



   let result= await loginUserServices(req.body)
    
    senResponse(res,200,{
    
         status: true,
        message: 'User Login successfully',
        data: result,
        
      })


})