
import * as mailgunLoader from 'mailgun-js';
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.MAILGUN_APIKEY as string
const publicApiKey = process.env.MAILGUN_PUBLIC as string
const DOMAIN = process.env.MAILGUN_DOMAIN as string

const mailgun = mailgunLoader.default ({apiKey: apiKey, domain: DOMAIN});
const publicMailgun = mailgunLoader.default ({apiKey: publicApiKey, domain: DOMAIN});
const router = express()

const sendEmail =(to:string, from:string, subject:string, content:string) => {
    let data = {
        to,
        from,
        subject,
        text:content
    };
    //sends a promise
    return mailgun.messages().send(data);
};

router.post("/send-email", async(req,res)=>{
    try{
        await sendEmail(req.body.to, "no-reply@test.com", req.body.subject, req.body.message)
        res.send("email sent!")
    }catch(e){
        console.log(e)
        res.status(500);
    }
})

router.post("/verify-email", async (req,res)=>{
    const userEmail = req.body.email
    console.log(userEmail)
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)){
       try{
        const validationEmail = await publicMailgun.validate(userEmail);
        console.log(validationEmail)
       } catch (error){
        console.log(error)
       }
    
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)

})

export default router;