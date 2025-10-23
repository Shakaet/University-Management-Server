import { AppError } from "../../Errors/AppError";
import { UserModel } from "../user/user.model";
import { TloginUser } from "./auth.interface";

import bcrypt from "bcrypt"
import { validateUserById } from "./utils";

import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config";
import { sentEmail } from "../../utils/sendEmail";



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






export let refreshTokenServices=async(token:string)=>{


     // if the token is sent from the client
        if(!token){
            throw new AppError(401,`You are not Authorized`,"")
        }
    
        // check if the token is valid
    
    
        // verify a token symmetric
    
    
        
    // invalid token - synchronous
                   
             const decoded = jwt.verify(token, config.JWT_Refresh_Secret as string);
    
                // check roles are valid
    
                let role= (decoded as JwtPayload).role
    
                let id= (decoded as JwtPayload). userId
                let iat=(decoded as JwtPayload).iat
    
    
                
                 const user = await validateUserById(id);
                
                    // console.log(user)
                    
    
                    if(!user){
                        throw new AppError(401,`unauthorized access`,"")
                    }
    
    
    
    
                    let passwordChangedTime=user.passwordChagedAt
                    let jwtIssueTime:number=iat as number
    
                    let passwordChangedTimeConvertToNumber=new Date(passwordChangedTime as Date).getTime()/1000
    
                    // console.log(passwordChangedTimeConvertToNumber,jwtIssueTime)
    
                    if(passwordChangedTimeConvertToNumber>jwtIssueTime){
    
                        throw new AppError(401,`you are not authorized`,"")
    
                    }



    let jwtPayload={
        userId:user?.id,
        role:user?.role

    }

     // create json web access token ans sent to the client

   let accessToken= jwt.sign(jwtPayload, config.JWT_Access_Secret as string , { expiresIn: config.JWT_Access_Expired  || "10d" });
     // create json refresh token ans sent to the client

   let refreshToken= jwt.sign(jwtPayload, config.JWT_Refresh_Secret as string , { expiresIn: config.JWT_Refresh_Expired ||"265d"  });


    return {
    accessToken
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




export let forgetPasswordServices=async(id:string)=>{


    const user = await validateUserById(id);

    
    let jwtPayload={
        userId:user?.id,
        role:user?.role

    }



    // create json web access token ans sent to the client

   let resetToken= jwt.sign(jwtPayload, config.JWT_Access_Secret as string , { expiresIn: "10m" });
     // create json refresh token ans sent to the client


    const resetLinkUI=`${config.Reset_Password_UI_Link}?id=${user?.id}&token=${resetToken}`

    // console.log(resetLinkUI)

    sentEmail(user.email,resetLinkUI)





}

export let resetPasswordServices=async(token:string,payload:{id:string,newPassword:string})=>{



    const user = await validateUserById(payload.id);


     const decoded = jwt.verify(token, config.JWT_Access_Secret as string);
    
                // check roles are valid
    
                let role= (decoded as JwtPayload).role
    
                let id= (decoded as JwtPayload). userId
                let iat=(decoded as JwtPayload).iat


                if(id !==payload.id){

                    throw new AppError(403,"you are forbidden","")
                }



                 // hash new password

    let newHashPassWord =await bcrypt.hash(payload.newPassword,Number(config.bcryptHash))



//    console.log(newHashPassWord)

    let result=await UserModel.findOneAndUpdate({
        id:id,
        role:role
    },{
        password:newHashPassWord,
        needsPasswordChange:false,
        passwordChgagedAt:new Date()
    })

    


}