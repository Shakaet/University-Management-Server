
import z from 'zod';



export let loginValidationSchema=z.object({
    body:z.object({
        id:z.string({message:"ID is Required"}),
        password:z.string({message:"Password is Required"})

    })
})