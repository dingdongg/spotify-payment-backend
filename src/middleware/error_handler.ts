import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).send(`
        <p>
            Something went wrong!
        </p>
    `);
}