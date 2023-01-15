import { RequestHandler } from "express";

export const isAuthenticated: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        console.log("logged in!");
        next();
    } else {
        res.status(401).send(`<p>you are not authenticated.</p>`);
    }
}