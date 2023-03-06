import { CsrfSyncedToken } from "csrf-sync";
import "express-session";

declare module "express-session" { // additional typing to support userId
    export interface SessionData {
        userId: string;
        csrfToken: CsrfSyncedToken;
    }
}