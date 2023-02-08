import express from 'express';
import { IUser, User } from "./database/models/User";
import UserController from './controllers/UserController';
import PaymentController from './controllers/PaymentController';
import dotenv from "dotenv";
import { connect } from "./database/db";
import bodyParser from 'body-parser';
import Status from "./enum/Status";
import { IPayment, Payments } from './database/models/Payments';
import composeEmail from './services/EmailServices';

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.use (composeEmail)
app.get("/", async (req, res) => {
    console.log("GOT GET REQUEST");
    const user = await User.find().exec();
    res.send(user);
    

});

app.post("/", async (req, res) => {
    const userController = new UserController();
   
    const { body } = req;
    console.log("BODY", req.body);
    console.log("rq",req);
    await userController.createUser(body as IUser);
    
    
    res.status(204).send();
})

app.listen(process.env.PORT, () => {
    connect();
    console.log(`listening on port ${process.env.PORT}`);
})