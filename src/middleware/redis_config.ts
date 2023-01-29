import session from "express-session";
import redis from "connect-redis";
import { createClient } from "redis";

const RedisStore = redis(session);
const redisClient = createClient({ legacyMode: true });

const SESSION_TIMEOUT_MS = 300000;

function connectRedis() {
    redisClient.connect()
        .then(() => {
            console.log("connected to redis");
        })
        .catch(err => console.error(err));
}

connectRedis(); // boot up redis

export const redisSession = session({
    secret: process.env.SESSION_SECRET as string,
    name: "splitify-connection",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ 
        client: redisClient,
        ttl: SESSION_TIMEOUT_MS / 1000,
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax", 
        httpOnly: true,
        maxAge: SESSION_TIMEOUT_MS,
    },
});