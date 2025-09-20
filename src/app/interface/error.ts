 export type TerrorSource={
    path:string|number|symbol,
    message:string
  }[]

  export type TGenericErrorResponse={
      statusCode:number,
      message:string,
      errorSource:TerrorSource
  }
