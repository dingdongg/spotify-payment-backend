import { ErrorRequestHandler } from "express";
import { csrfSync } from "csrf-sync";

const { invalidCsrfTokenError } = csrfSync();

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.code === invalidCsrfTokenError.code) {
        console.log(err.message);
        res.status(403).send({
            message: "Invalid CSRF token.",
            code: err.code,
        });
    } else {
        next(err);
    }
}