import express from "express"
import { v2 as cloudinary } from 'cloudinary';

import multer from 'multer'
import config from "../config";
export let sendImagetoCloudinary=async()=>{



    // Configuration
    cloudinary.config({ 
        cloud_name: config.Cloud_Name, 
        api_key: config.Api_Key, 
        api_secret: config.Api_Secret // Click 'View API Keys' above to copy your API secret
    });



     // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });

        console.log(uploadResult);



}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+ "/upload/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })