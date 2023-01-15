import express from 'express';
import { IUser, User } from "./database/models/User";
import UserController from './controllers/UserController';
import dotenv from "dotenv";
import { connect } from "./database/db";
import bodyParser from 'body-parser';
import userRouter from "./routers/user_router";
import loginRouter from "./routers/login_router";
import session from "express-session";
import redis from "connect-redis";
import { createClient } from "redis";

// const RedisStore = redis(session);
// const redisClient = createClient({ legacyMode: true });

// function connectRedis() {
//     redisClient.connect()
//         .then(() => {
//             console.log("connected to redis");
//         })
//         .catch(err => console.error(err));
//     // redisClient.on("error", () => console.error("Failed to connect to Redis"));
//     // redisClient.on("connect", () => console.log("Connected to Redis!"));
// }
// connectRedis();
const app = express();
dotenv.config();

// middlewares
app.use(bodyParser.json());
// app.use(session({
//     secret: process.env.SESSION_SECRET as string,
//     name: "splitify-connection",
//     resave: false,
//     saveUninitialized: true,
//     store: new RedisStore({ client: redisClient }),
//     cookie: {
//         // secure: true,
//         sameSite: "lax", 
//     },
// }))
// use synchronized token pattern for CSRF protection

// routers
app.use("/users", userRouter);

app.get("/", async (req, res) => {
    console.log("GOT GET REQUEST");
    // req.session.cookie.maxAge = 300000;
    console.log(req.session);
    const user = await User.find().exec();
    res.send(user);
});

app.post("/", async (req, res) => {
    // const userController = new UserController();
    
    const { body } = req;
    console.log("BODY", req.body);

    // const user = await User.findOne({
    //     username: body.username,
    // }).exec();

    // if (user) {
    //     const cookieUid = crypto.randomUUID();
    //     await redisClient.set(cookieUid, user.id);
    //     console.log("successfully stored user mappping in redis");
    // }

    // await userController.createUser(body as IUser);
    res.status(204).send();
})

app.use("/login", loginRouter);


app.listen(process.env.PORT, () => {
    connect();
    console.log(`listening on port ${process.env.PORT}`);
})