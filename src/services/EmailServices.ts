import express from 'express';
import Mailgun from 'mailgun-js';
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.MAILGUN_APIKEY as string
const DOMAIN = process.env.MAILGUN_DOMAIN as string

const mg = new Mailgun ({apiKey: apiKey, domain: DOMAIN});
const app = express();

app.post('/send-email', (req, res) => {
    console.log(req)
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: 'kimtandyo1132@gmail.com, YOU@YOUR_DOMAIN_NAME',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!'
    };
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            res.status(200).send('Email sent');
        }
    });
});

app.get("/send-email", async (req, res) => {
    console.log("email tester");
    console.log(req)
});