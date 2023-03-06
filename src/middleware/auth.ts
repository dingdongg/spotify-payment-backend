import { RequestHandler } from "express";
import { User } from "../database/models/User";
import { sendError } from "../helpers/error_response";

const isAuthenticated: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        console.log("logged in!");
        next();
    } else {
        sendError(res, 401, "you are not authenticated.");
    }
}

// assumes the user is authenticated already,
// so this middleware must be mounted AFTER isAuthenticated()
const isAuthorized: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId).exec();

        if (user?.adminStatus) {
            next();
        } else {
            sendError(
                res, 
                403, 
                "you are not authorized to request access to this resource."
            );
        }
    } catch (error) {
        sendError(res, 500, "something went wrong with authorization.");
    }
}

const auth = {
    isAuthenticated,
    isAuthorized,
};

export default auth;