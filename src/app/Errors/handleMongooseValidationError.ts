import mongoose from "mongoose";
import { TerrorSource } from "../interface/error";


export let handleMongooseValidationError=(err:mongoose.Error.ValidationError)=>{

     let statusCode = 400;
    
      let errorSource: TerrorSource = Object.values(err.errors).map(
  (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    return {
      path: val?.path as string | number,
      message: val.message,
    };
  }
);
    
      return {
        statusCode,
        message:"Mongoose Validation Error",
        errorSource
      };

}