import { ZodError, ZodIssue } from "zod";
import { TerrorSource } from "../interface/error";

export let handlerZod = (err: ZodError) => {
  let statusCode = 400;

  let errorSource:TerrorSource=err.issues.map((issue:ZodIssue)=>{
      return{
        path:issue.path[issue.path.length-1],
        message:issue.message,
      }

    })

  return {
    statusCode,
    message:"Zod Validation Error",
    errorSource
  };
};