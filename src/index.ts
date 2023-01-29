import express from 'express';
import dotenv from "dotenv";
import { connect } from "./database/db";
import bodyParser from 'body-parser';
import userRouter from "./routers/user_router";
import loginRouter from "./routers/login_router";
import auth from './middleware/auth';
import { redisSession } from './middleware/redis_config';
import { csrfSync } from "csrf-sync";
import { errorHandler as csrfErrorHandler } from './middleware/csrf_error_handler';
import { errorHandler } from './middleware/error_handler';

const {
    generateToken,
    csrfSynchronisedProtection,
    getTokenFromRequest,
    getTokenFromState,
} = csrfSync();

const app = express();
dotenv.config();

// middlewares
app.use(bodyParser.json()); // json parsing
app.use(redisSession); // session-based authentication
app.use((req, res, next) => {
    console.log("HEADER: ", getTokenFromRequest(req));
    console.log("STATE:  ", getTokenFromState(req));
    next();
});

// routers
app.get("/csrf-token", async (req, res, next) => { 
    res.json({
        token: generateToken(req),
    });
})
// CSRF protection; all routes below this is protected from CSRF :)
app.use(csrfSynchronisedProtection); 

app.use("/", loginRouter);
// all routes below this middleware requires authentication
app.use(auth.isAuthenticated);
app.use("/users", userRouter);

app.get("/", async (req, res) => {
    console.log("GOT GET REQUEST");
    console.log("GET / csrf token: ", req.session.csrfToken);
    res.send(`<p>GET /</p>`);
});

app.post("/", async (req, res) => {
    console.log("BODY", req.body);
    res.status(204).send();
})

// error handler middleware
app.use(csrfErrorHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    connect();
    console.log(`listening on port ${process.env.PORT}`);
})