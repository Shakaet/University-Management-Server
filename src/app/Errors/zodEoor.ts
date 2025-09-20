import { ZodError, ZodIssue } from "zod";
import { TerrorSource, TGenericErrorResponse } from "../interface/error";

export let handlerZod = (err: ZodError):TGenericErrorResponse => {
  let StatusCode = 400;

  let errorSource:TerrorSource=err.issues.map((issue:ZodIssue)=>{
      return{
        path:issue.path[issue.path.length-1],
        message:issue.message,
      }

    })

  return {
    StatusCode,
    message:"Zod Validation Error",
    errorSource
  };
};