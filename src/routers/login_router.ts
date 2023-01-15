import express from 'express';
import { User } from '../database/models/User';
import bcrypt from "bcrypt";
import session from "express-session";
import redis from "connect-redis";
import { createClient } from "redis";

const router = express();

const RedisStore = redis(session);
const redisClient = createClient({ legacyMode: true });

function connectRedis() {
    redisClient.connect()
        .then(() => {
            console.log("connected to redis");
        })
        .catch(err => console.error(err));
    // redisClient.on("error", () => console.error("Failed to connect to Redis"));
    // redisClient.on("connect", () => console.log("Connected to Redis!"));
}
connectRedis();

router.use(session({
    secret: process.env.SESSION_SECRET as string,
    name: "splitify-connection",
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
        // secure: true,
        sameSite: "lax", 
    },
}))

router.get("/", async (req, res) => {
    console.log(req.sessionID);
    res.status(200).end();
})

router.post("/", async (req, res, next) => {

    const { username, password } = req.body;
    /**
     * 1. validate username and password
     * 2. if step 1 passed, create and link session ID to this user, store in DB?
     * 3. send 204 back + session ID from 2 as cookies
     */
    const user = await User.findOne({
        username, 
    }).exec();
    
    if (user) {
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (passwordMatches) {
            // create and link session ID to this user
            // send 204 + session ID as cookies

            req.session.regenerate((err) => {
                if (err) next(err);

                req.session.userId = user.id;

                req.session.save((err) => {
                    if (err) next(err);
                    res.redirect("/");
                });
            });
        }
    } else {
        res.status(404).send({
            error: "User was not found."
        });
    }
});

router.post("/logout", async (req, res, next) => {

    req.session.userId = null;
    req.session.destroy((err) => {
        console.log('logged out');
        res.redirect("/");
    });
})

export default router;