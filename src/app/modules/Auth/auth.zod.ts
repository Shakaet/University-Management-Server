
import z from 'zod';



export let loginValidationSchema=z.object({
    body:z.object({
        id:z.string({message:"ID is Required"}),
        password:z.string({message:"Password is Required"})

    })
})


export let changedPasswordValidationSchema=z.object({
    body:z.object({
        oldPassword:z.string({message:"Old Password is Required"}),
        newPassword:z.string({message:"Password is Required"})

    })
})