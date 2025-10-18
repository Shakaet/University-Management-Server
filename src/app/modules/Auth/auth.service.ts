import { AppError } from "../../Errors/AppError";
import { UserModel } from "../user/user.model";
import { TloginUser } from "./auth.interface";

import bcrypt from "bcrypt"
import { validateUserById } from "./utils";

import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config";



export let loginUserServices=async(payload:TloginUser)=>{


    // // console.log(payload)

    // // check the user is exist

    let id=payload?.id
    let password=payload?.password
    // let isUserExist=await UserModel.findOne({id})

    // console.log(isUserExist)

    // if(!isUserExist){
    //     throw new AppError(404,`this User not Exist`,"")
    // }


    // // check the user is already deleted

    // let isUserDeleted=isUserExist?.isDeleted
    // if(isUserDeleted){

    //      throw new AppError(404,`this User not Exist (already Deleted)`,"")

    // }


    // // check if the user is blocked

    // let isUserBlocked=isUserExist?.status

    // if(isUserBlocked==="blocked"){

    //     throw new AppError(404,`this User is Blocked`,"")

    // }



    // // check if the password is correct


    //   // 2️⃣ Password match করো
    // const isMatch = await bcrypt.compare(payload.password, isUserExist.password); // user.password হলো DB তে stored hash

    // if (!isMatch) {
     
    //     throw new AppError(404,`Password did not match`,"")
    // }



    const user = await validateUserById(id, password);

    console.log(user)


    // access granted: send Access token,Refresh token


    let jwtPayload={
        userId:user?.id,
        role:user?.role



    }



    // create json web access token ans sent to the client

   let accessToken= jwt.sign(jwtPayload, config.JWT_Access_Secret as string , { expiresIn: config.JWT_Access_Expired  || "10d" });
     // create json refresh token ans sent to the client

   let refreshToken= jwt.sign(jwtPayload, config.JWT_Refresh_Secret as string , { expiresIn: config.JWT_Refresh_Expired ||"265d"  });

   

   return {
    accessToken,
    refreshToken,
    needPasswordChanged:user?.needsPasswordChange
   }



} 

  
// type TUser={
//     userId:string,
//     role:string
// }


type TPass={
    oldPassword:string,
    newPassword:string
}

export let changedPasswordServices=async(userData:JwtPayload,payload:TPass)=>{



      const user = await validateUserById(userData.userId, payload.oldPassword);

    //   console.log(user)



    // hash new password

    let newHashPassWord =await bcrypt.hash(payload.newPassword,Number(config.bcryptHash))



//    console.log(newHashPassWord)

    let result=await UserModel.findOneAndUpdate({
        id:userData.userId,
        role:userData.role
    },{
        password:newHashPassWord,
        needsPasswordChange:false,
        passwordChagedAt:new Date()
    })

    // console.log(result)

    return null


}