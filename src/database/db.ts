import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// disables warnings in console
mongoose.set('strictQuery', false);

function validate(input: string | undefined): boolean {
    return typeof input === "string";
}

/**
 * connects to DB, based on NODE_ENV
 */
export const connect = () => {
    if (process.env.NODE_ENV === "dev") {
        mongoose.connect(process.env.DEV_DB as string)
            .then(() => {
                console.log("connected to development DB");

            })
            .catch((err) => {
                console.error(err);
            })
    } else if (process.env.NODE_ENV === "test") {
        mongoose.connect(process.env.TEST_DB as string)
            .then(() => {
                console.log("connected to testing DB");
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        console.log("INVALID");
    }
}
