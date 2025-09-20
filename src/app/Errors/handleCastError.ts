import mongoose from "mongoose";
import { TerrorSource, TGenericErrorResponse } from "../interface/error";

export let handleCastError=(err:mongoose.Error.CastError):TGenericErrorResponse=>{

   let errorSource:TerrorSource=[{
    path:err?.path,
    message:err?.message
   }]
     let StatusCode = 400;
     return {
        StatusCode,
        message:"Cast Validation Error",
        errorSource
      };

}