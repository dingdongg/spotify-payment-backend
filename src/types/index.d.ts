import "express-session";

declare module "express-session" { // additional typing to support userId
    interface SessionData {
        userId: string;
    }
}