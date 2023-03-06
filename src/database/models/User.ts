import { Schema, model } from "mongoose";

export interface IUser {
    username?: string; // remove and use email as username?
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    picture?: string;
    accountBalance?: number;
    roleMask?: number;
    adminStatus?: boolean;
    dateCreated?: Date;
}

const userSchema = new Schema<IUser>({
    username: String,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: String,
    accountBalance: Number,
    roleMask: Number,
    adminStatus: Boolean,
    dateCreated: Date,
});

export const User = model<IUser>("User", userSchema);




