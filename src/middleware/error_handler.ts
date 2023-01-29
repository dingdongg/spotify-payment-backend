import { ErrorRequestHandler } from "express";
import { sendError } from "../helpers/error_response";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    sendError(res, 500, "something went wrong!");
}