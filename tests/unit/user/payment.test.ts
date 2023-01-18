import chai from "chai";
import PaymentController from "../../../src/controllers/PaymentController";
import mongoose, { Schema } from 'mongoose';
import { connect } from '../../../src/database/db';
import { Payments } from "../../../src/database/models/Payments";
import UserController from "../../../src/controllers/UserController";
import { User } from "../../../src/database/models/User";
import Status from "../../../src/enum/Status"

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
        let userId;
        try {
            const user = await User.findOne({
                email: "michaeltest@gmail.com"
            }).exec();
            
            if (user) {
                userId = user._id;
            } else {
                console.log("No user found with that email");
            }
        } catch (err) {
            console.error(err);
        }
     
        let date = new Date();
        const paymentInfo = {
            memberId: userId?.valueOf(),
            paymentAmount: 20,
            paymentDate: date,
            paymentStatus: Status[0].toString()
        };
        
        
        await paymentController.createPayment({ 
            ...paymentInfo
        })

        const paymentInstance = await Payments.findOne({
            memberId: userId?.valueOf()
        }).exec()
        
        expect(paymentInstance).to.exist;
        expect(paymentInstance?.paymentDate).to.include(paymentInfo.paymentDate);
        expect(paymentInstance?.memberId).to.include(paymentInfo.memberId);
        expect(paymentInstance?.paymentAmount).to.equal(paymentInfo.paymentAmount);
        expect(paymentInstance?.paymentStatus).to.equal(paymentInfo.paymentStatus);
        
        
})  
    it ("PaymentController::creation of payment history", async () =>{
       //creating two different users
       await Payments.deleteMany({});
        const userInfo1 = {
            firstName: "mahkel",
            lastName: "test",
            email: "michaeltest@gmail.com",
            password: "test"
        };
        await userController.createUser({
            ...userInfo1
        })
        // const userInfo2 = {
        //     firstName: "donggyu",
        //     lastName: "test",
        //     email: "donggyutest@gmail.com",
        //     password: "test"
        // };
        // await userController.createUser({
        //     ...userInfo2
        // })

        // const userInstance = await User.find({}).exec();
       

        //create multiple payment for one guy
        //lets start with mahkels
        let userId;
        try {
            const user = await User.findOne({
                email: "michaeltest@gmail.com"
            }).exec();
            
            if (user) {
                userId = user._id;
            } else {
                console.log("No user found with that email");
            }
        } catch (err) {
            console.error(err);
        }
        
        for (let i = 0; i < 3 ; i++){
            
            const paymentInfo = {
                memberId: userId?.valueOf(),
                paymentAmount: Math.floor(Math.random() * (69-3)+3),
                paymentDate: new Date(),
                paymentStatus: Status[Math.floor(Math.random()*(3-0))].toString()
            };
            await paymentController.createPayment({ 
                ...paymentInfo
            })
        }
        const paymentInstance = await Payments.find({});
        console.log (paymentInstance)

        // console.log(userId?.valueOf())
        
        let getAdminHistory = await paymentController.findUserPaymentHistory(userId?.valueOf());
        console.log("test",getAdminHistory)
        
        
        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        
    })

})
