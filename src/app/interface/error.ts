 export type TerrorSource={
    path:string|number|symbol,
    message:string
  }[]

  export type TGenericErrorResponse={
      StatusCode:number,
      message:string,
      errorSource:TerrorSource
  }
