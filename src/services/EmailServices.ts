
import * as mailgunLoader from 'mailgun-js';
import express from 'express';
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.MAILGUN_APIKEY as string
const DOMAIN = process.env.MAILGUN_DOMAIN as string

let mailgun = mailgunLoader.default ({apiKey: apiKey, domain: DOMAIN});

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

export default router;