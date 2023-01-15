import "express-session";

declare module "express-session" { // additional typing to support userId
    export interface SessionData {
        userId: string;
    }
}