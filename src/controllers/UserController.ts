import { User, IUser } from "../database/models/User";
import { Types } from "mongoose";
import bcrypt from "bcrypt";


export default class UserController {

    constructor() {
        // ?
    }

    public async createUser(newUserInfo: IUser): Promise<void> {

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newUserInfo.password, salt);

        const newUser = new User({
            ...newUserInfo,
            password: passwordHash,
            id: new Types.ObjectId(),
            dateCreated: new Date(),
        });

        try {
            await newUser.save();
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteUser(userId: string): Promise<void> {
        await User.findByIdAndDelete(userId).exec();
    }

    public async updateUser(userId: string, newInfo: IUser): Promise<void> {
        await User.findByIdAndUpdate(userId, newInfo).exec();
    }

    public async adminChecker(userId: string): Promise<boolean> {
        try {
            const user = await User.findById(userId).exec();
            if (user?.adminStatus) {
                return true;
            } 
        } catch (error) {
            console.error(error);
            throw new Error("error");
        }

        return false;
    }
}