import chai from "chai";
import PaymentController from "../../../src/controllers/PaymentController";
import mongoose, { Schema } from 'mongoose';
import { connect } from '../../../src/database/db';
import { Payments } from "../../../src/database/models/Payments";
import UserController from "../../../src/controllers/UserController";
import { User } from "../../../src/database/models/User";

const expect = chai.expect;

describe ("Payment Tests", ()=>{
    let paymentController: PaymentController;
    let userController : UserController;

    before (async ()=> {
        await connect();
        await Payments.deleteMany({});
        paymentController = new PaymentController();
        userController = new UserController();
    });

    it ("PaymentController::createPayment successfully upload user in DB", async () =>{
        //make mock user first
        const userInfo = {
            firstName: "mahkel",
            lastName: "test",
            email: "michaeltest@gmail.com",
            password: "test"
        };
        await userController.createUser({
            ...userInfo
        })

        const user = await User.findOne({
            email: "michaeltest@gmail.com"
        }).exec();
        
        const paymentInfo = {
            memberId: new Schema.Types.ObjectId("63aa552265158efd2fba1a6f"),
            paymentAmount: 20,
            paymentDate: new Date(),
            paymentStatus: "test"
        };
        await paymentController.createPayment({ 
            ...paymentInfo
        })

    
})

})
