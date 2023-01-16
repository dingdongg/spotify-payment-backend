import express from 'express';
import { User } from "./database/models/User";
import dotenv from "dotenv";
import { connect } from "./database/db";
import bodyParser from 'body-parser';
import userRouter from "./routers/user_router";
import loginRouter from "./routers/login_router";
import { isAuthenticated } from './middleware/authentication';
import { redisSession } from './middleware/redis_config';
import { csrfSync } from "csrf-sync";

const {
    generateToken,
    csrfSynchronisedProtection,
    getTokenFromRequest,
} = csrfSync();

const app = express();
dotenv.config();

// middlewares
app.use(bodyParser.json()); // json parsing
app.use(redisSession); // session-based authentication
// use synchronized token pattern for CSRF protection
app.use((req, res, next) => {
    console.log("token in header: ", getTokenFromRequest(req));
    next();
});

// routers
app.get("/csrf-token", async (req, res, next) => { 
    res.json({
        token: generateToken(req),
    });
})
app.use(csrfSynchronisedProtection);

app.use("/", loginRouter);
app.use("/users", isAuthenticated, userRouter);

app.get("/", async (req, res) => {
    console.log("GOT GET REQUEST");
    console.log(req.session);
    const user = await User.find().exec();
    res.send(user);
});

app.post("/", async (req, res) => {
    console.log("BODY", req.body);
    res.status(204).send();
})

app.listen(process.env.PORT, () => {
    connect();
    console.log(`listening on port ${process.env.PORT}`);
})