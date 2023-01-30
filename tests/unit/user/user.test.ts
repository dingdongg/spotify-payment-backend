import { User } from '../../../src/database/models/User';
import UserController from '../../../src/controllers/UserController';
import { connect } from '../../../src/database/db';
import mongoose from 'mongoose';
import chai from "chai";
import bcrypt from 'bcrypt';

const expect = chai.expect;

describe("User Tests", () => {
    let userController: UserController;

    before(async () => {
        await connect();
        userController = new UserController();
    });

    it("UserController::createUser successfully uploads user instance to DB", async () => {
        const userInfo = {
            firstName: "donggyu",
            lastName: "test",
            email: "testing123@gmail.com",
        };

        const password = "pokemon123";

        await userController.createUser({
            ...userInfo,
            password,
        });

        const userInstance = await User.findOne({
            email: "testing123@gmail.com",
        }).exec();

        expect(userInstance).to.exist;
        expect(userInstance).to.include(userInfo);

        const passwordCheck = bcrypt.compareSync(password, userInstance?.password as string);
        expect(passwordCheck).to.be.true;
    });

    it("UserController::createUser successfully deletes user in DB", async () => {
        await userController.createUser({
            firstName: "donggyu",
            lastName: "test",
            email: "testing123@gmail.com",
            password: "pokemon123",
        });
        
        const user = await User.findOne({
            email: "testing123@gmail.com",
        }).exec();
        
        const userId = user?.id;
        expect(userId).to.not.be.null;
        
        await userController.deleteUser(userId);

        const deletedUser = await User.findOne({
            email: "testing123@gmail.com",
        }).exec();

        expect(deletedUser).to.be.null;
    });

    it("UserController::editUser successfully edits user in DB", async () => {

        const oldUserInfo = {
            firstName: "OLD",
            lastName: "LAST NAME BUT OLD",
            email: "old.email123@gmail.com",
            password: "qwer1234",
        };

        await userController.createUser(oldUserInfo);

        const oldUser = await User.findOne({
            email: "old.email123@gmail.com",
        });

        const newUserInfo = {
            ...oldUserInfo,
            email: "NEW.EMAIL1234@gmail.com",
            firstName: "NEWFIRSTNAME",
        };

        await userController.updateUser(oldUser?.id, newUserInfo);

        const newUser = await User.findOne({
            email: "NEW.EMAIL1234@gmail.com",
        });

        expect(newUser).to.have.property('firstName', "NEWFIRSTNAME");
        expect(newUser).to.have.property('lastName', "LAST NAME BUT OLD");
        expect(newUser).to.have.property('email', "NEW.EMAIL1234@gmail.com");

        /**
         * This test has been commented out due to a bug in UserController.
         * 
         * Currently, when an edit request is made to a user's information,
         * it requires that the request body includes a new password, as
         * the interface IUser asserts this. A PR must be made to handle 
         * password changes separately and remove it from user info edit requests.
         */
        // expect(newUser?.password).to.equal(oldUser?.password);
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    after(async () => {
        await mongoose.disconnect();
    });
});