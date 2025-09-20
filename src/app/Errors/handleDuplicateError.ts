import { TerrorSource, TGenericErrorResponse } from "../interface/error";

export let handleDuplicateError=(err:any):TGenericErrorResponse=>{


    let match=err.message.match(/"([^"]*)"/);

    let extractValue=match && match[1]


     let errorSource:TerrorSource=[{
        path:"",
        message:`${extractValue} is already exist`
       }]





     let StatusCode = 400;

     return {
        StatusCode,
        message:"Duplicate 11000 Validation Error",
        errorSource
      };


}