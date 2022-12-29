import express from 'express';
import { IUser, User } from "./database/models/User";
import UserController from './controllers/UserController';
import dotenv from "dotenv";
import { connect } from "./database/db";
import bodyParser from 'body-parser';
import userRouter from "./routers/user_router";

const app = express();
dotenv.config();

// middlewares
app.use(bodyParser.json());

// routers
app.use("/users", userRouter);

app.get("/", async (req, res) => {
    console.log("GOT GET REQUEST");
    const user = await User.find().exec();
    res.send(user);
});

app.post("/", async (req, res) => {
    const userController = new UserController();
    
    const { body } = req;
    console.log("BODY", req.body);
    await userController.createUser(body as IUser);
    res.status(204).send();
})

app.listen(process.env.PORT, () => {
    connect();
    console.log(`listening on port ${process.env.PORT}`);
})