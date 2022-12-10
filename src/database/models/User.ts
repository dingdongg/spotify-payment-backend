import { Schema, model, Types } from "mongoose";

export interface IUser {
    id: Types.ObjectId;
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
    id: Schema.Types.ObjectId,
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
