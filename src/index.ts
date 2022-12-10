import express from 'express';
import { User } from "./database/models/User";
import dotenv from "dotenv";
import { connect } from "./database/db";

const app = express();
dotenv.config();

app.get("/", async (req, res) => {
    console.log("GOT GET REQUEST");
    const user = await User.find().exec();
    res.send(user);
});

app.listen(process.env.PORT, () => {
    connect();
    console.log(`listening on port ${process.env.PORT}`);
})