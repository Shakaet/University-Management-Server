import { AppError } from "../../Errors/AppError";
import { UserModel } from "../user/user.model";
import { TloginUser } from "./auth.interface";

import bcrypt from "bcrypt"
import { validateUserById } from "./utils";



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

    // console.log(user)


    // access granted: send Access token,Refresh token





} 