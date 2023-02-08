
import * as mailgunLoader from 'mailgun-js';
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.MAILGUN_APIKEY as string
const DOMAIN = process.env.MAILGUN_DOMAIN as string

let mailgun = mailgunLoader.default ({apiKey: apiKey, domain: DOMAIN});

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

