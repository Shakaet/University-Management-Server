import mongoose from "mongoose";
import { TerrorSource, TGenericErrorResponse } from "../interface/error";


export let handleMongooseValidationError=(err:mongoose.Error.ValidationError):TGenericErrorResponse=>{

     let StatusCode = 400;
    
      let errorSource: TerrorSource = Object.values(err.errors).map(
  (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    return {
      path: val?.path as string | number,
      message: val.message,
    };
  }
);
    
      return {
        StatusCode,
        message:"Mongoose Validation Error",
        errorSource
      };

}