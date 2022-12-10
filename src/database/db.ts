import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function validate(input: string | undefined): boolean {
    return typeof input === "string";
}

export const connect = () => {
    if (validate(process.env.DATABASE)) {
        console.log("VALID");
        mongoose.connect(process.env.DATABASE as string)
            .then(() => {
                console.log("connected to DB");
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        console.log("INVALID");
    }
}
