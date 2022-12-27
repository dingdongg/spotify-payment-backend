import express from 'express';
import { IUser, User } from "./database/models/User";
import UserController from './controllers/UserController';
import dotenv from "dotenv";
import { connect } from "./database/db";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.get("/", async (req, res) => {
    console.log("GOT GET REQUEST");

    // const test = {
    //     firstName: "Michael",
    //     lastName: "Tandyo",
    //     email: "test@gmail.com",
    //     password: "test"
    // }
    // const userController = new UserController();
    // console.log(test);
    // await userController.createUser(test as IUser);
    const user = await User.find().exec();
    res.send(user);
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