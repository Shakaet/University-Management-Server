import nodemailer from "nodemailer"
import config from "../config";



// mkzh aegf xnkk aopa
export let sentEmail=async(to:string,html:string)=>{
    // Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  // secure production e true, development e false
  secure: config.NODE_ENV ==="production",
  auth: {
    user: "abdshakaet@gmail.com",
    pass: "mkzh aegf xnkk aopa",
  },
});


 await transporter.sendMail({
    from: 'abdshakaet@gmail.com',
    to: `${to}`,
    subject: "Reset your Password within 10 minutes",
    text: "", // plain‑text body
    html:`${html}`, // HTML body
  });

}