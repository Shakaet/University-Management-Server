
import z from 'zod';



export let loginValidationSchema=z.object({
    body:z.object({
        id:z.string({message:"ID is Required"}),
        password:z.string({message:"Password is Required"})

    })
})


export let refreshTokenValidationSchema=z.object({
    cookies:z.object({
        refreshToken:z.string({message:"RefreshToken is Required"})
    })
})





export let changedPasswordValidationSchema=z.object({
    body:z.object({
        oldPassword:z.string({message:"Old Password is Required"}),
        newPassword:z.string({message:"Password is Required"})

    })
})


export const forgetPassswordValidationSchema=z.object({

  body:z.object({
    id:z.string({
      message:"Id is Required"
    })
  })
})

export const resetPassswordValidationSchema=z.object({

  body:z.object({
    id:z.string({
      message:"Id is Required"
    }),
     newPassword:z.string({
      message:"Password is Required"
    })
  })
})
