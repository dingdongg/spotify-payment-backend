
import Mailgun from 'mailgun-js';
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.MAILGUN_APIKEY as string
const DOMAIN = process.env.MAILGUN_DOMAIN as string

const mg = new Mailgun ({apiKey: apiKey, domain: DOMAIN});


export default function composeEmail (){
    console.log("testasersa")
    const data = {
        from: `Mahkel <kimtandyo1132@gmail.com>`,
        to: 'kimtandyo1132@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!'
};
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log(error);
           
        } else {
            console.log(body)
           
        }
}); 
}


