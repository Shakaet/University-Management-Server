
import { JwtPayload } from "jsonwebtoken";
import { catchAsynFunction } from "../../utils/catchAsync";
import { senResponse } from "../../utils/sendResponse";
import { changedPasswordServices, loginUserServices } from "./auth.service";




export let  loginUser=catchAsynFunction(async(req,res)=>{



   let result= await loginUserServices(req.body)

     let {accessToken, refreshToken,needPasswordChanged}=result

     // set refresh token in cookie ,firest parameter mane kon name save korbo,2nd ta ki set korbo,3rd ta option

     res.cookie("refreshToken",refreshToken,{
      secure:process.env. NODE_ENV=="production",
      httpOnly:true,

     })
    
    senResponse(res,200,{
    
         status: true,
        message: 'User Login successfully',
        // data: result,
        data:{
          accessToken,
          refreshToken,needPasswordChanged
        
        }
        
      })


})


export let changedPassword = catchAsynFunction(async(req,res)=>{


 

  // console.log(req.user,req.body)

  let user=req.user

     let result= await changedPasswordServices(user,req.body)


   
    
    senResponse(res,200,{
    
         status: true,
        message: 'Password Changed successfully',
        data: null,
        
      })



})