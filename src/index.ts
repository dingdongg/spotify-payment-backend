import express from 'express';
import { IUser, User } from "./database/models/User";
import UserController from './controllers/UserController';
import PaymentsController from './controllers/PaymentsController';
import dotenv from "dotenv";
import { connect } from "./database/db";
import bodyParser from 'body-parser';
import Status from "./enum/Status";
import { IPayment, Payments } from './database/models/Payments';

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.get("/", async (req, res) => {
    console.log("GOT GET REQUEST");

    

    const test = {
        paymentAmount: 54,
        paymentDate: new Date(),
        paymentStatus: Status[0]
    }
    console.log(test);
    const paymentController = new PaymentsController();
    await paymentController.createPayment(test as IPayment);

    // const user = await User.find().exec();
    // res.send(user);
    const payments = await Payments.find().exec();
    res.send(payments);
});

app.post("/", async (req, res) => {
    const userController = new UserController();
   
    const { body } = req;
    console.log("BODY", req.body);
    console.log(req);
    await userController.createUser(body as IUser);
    
    res.status(204).send();
})

app.listen(process.env.PORT, () => {
    connect();
    console.log(`listening on port ${process.env.PORT}`);
})