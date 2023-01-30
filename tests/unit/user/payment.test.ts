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
        await User.deleteMany({});
        paymentController = new PaymentController();
        userController = new UserController();
    });

    it ("PaymentController::createPayment successfully upload payment in DB", async () =>{
        //make mock user first
        await Payments.deleteMany({});
        await User.deleteMany({});
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

                let date = new Date();
                const paymentInfo = {
                    memberId: userId.valueOf().toString(),
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
            } else {
                expect.fail("No user found with that email");
            }
        } catch (err) {
            console.error(err);
        }
     
        
    })  
    it ("PaymentController::findUserPaymentHistory finds user and sort them in order by date", async () =>{
       //creating two different users
       await User.deleteMany({});
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
        
        let userId: Object;
        try {
            const user = await User.findOne({
                email: "michaeltest@gmail.com"
            }).exec();
            
            if (user) {
                userId = user._id;

                for (let i = 0; i < 3 ; i++){
                    let date = new Date(`202${i} October 1${i}`)
                        date.setMonth(Math.floor(Math.random()*(13-1)))
                        date.setDate(Math.floor(Math.random()*(32-1)))
                        date.setHours(Math.floor(Math.random()*(23-0)),Math.floor(Math.random()*(59-0)), Math.floor(Math.random()*(59-0)) )
                    const paymentInfo = {
                        memberId: userId.valueOf().toString(),
                        paymentAmount: Math.floor(Math.random() * (69-3)+3),
                        paymentDate: date,
                        paymentStatus: Status[Math.floor(Math.random()*(3-0))].toString()
                    };
                    await paymentController.createPayment({ 
                        ...paymentInfo
                    })
                }
        
                let testedUserId = userId?.valueOf().toString()
             
                let getUserHistory = await paymentController.findUserPaymentHistory(testedUserId);
                
                
                const paymentsArray = Object.values(getUserHistory);
                
                const sortedPayments = paymentsArray.sort((a, b) => a.paymentDate.getTime() - b.paymentDate.getTime());
                
                expect(paymentsArray).to.deep.equal(sortedPayments);
                expect(paymentsArray.every(payment => {return payment.memberId === userId?.valueOf() })).to.be.true
            } else {
                console.log("No user found with that email");
            }
        } catch (err) {
            console.error(err);
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    })

    it ("PaymentController:: getPaymentHistory and make sure its in order ", async () =>{
        await User.deleteMany({});
        await Payments.deleteMany({});
        const users = [
            {firstName: "mahkel", lastName: "test", email: "mahkel1@example.com", password: "testpassword"},
            {firstName: "donggyu", lastName: "test", email: "donggyu1@example.com", password: "testpassword"},
            {firstName: "michael", lastName: "test", email: "michael1@example.com", password: "testpassword"}
        ];
        
        
        const createUsers = users.map(user => userController.createUser(user));
        await Promise.all(createUsers);

        const userInstance = await User.find({}).exec();
       
        let createPayments = userInstance.map(async(data)=>{
            
            let memberId = data._id?.valueOf().toString();
            
            let payments = []
            for (let i = 0; i < 3 ; i++){
                let date = new Date(`202${i} October 1${i}`)
                date.setMonth(Math.floor(Math.random()*(13-1)))
                date.setDate(Math.floor(Math.random()*(32-1)))
                date.setHours(Math.floor(Math.random()*(23-0)),Math.floor(Math.random()*(59-0)), Math.floor(Math.random()*(59-0)) )
                
                const paymentInfo = {
                    memberId: memberId,
                    paymentAmount: Math.floor(Math.random() * (69-3)+3),
                    paymentDate: date,
                    paymentStatus: Status[Math.floor(Math.random()*(3-0))].toString()
                };
                
                payments.push(paymentController.createPayment(paymentInfo));
                
            }
                return Promise.all(payments)
            
        })
        await Promise.all(createPayments);

        let getPaymentHistory = await paymentController.getPaymentHistory()
        

        const paymentsArray = Object.values(getPaymentHistory);
        const sortedPayments = paymentsArray.sort((a, b) => a.paymentDate.getTime() - b.paymentDate.getTime());

        expect(paymentsArray).to.deep.equal(sortedPayments);
        expect(paymentsArray.length).to.eql(9)

        //test findUserPaymentHistory multiple 

       
        let testUserId = paymentsArray[0].memberId?.valueOf()
        

        let getUserHistory = await paymentController.findUserPaymentHistory(testUserId)
        

        const userPaymentArray = Object.values(getUserHistory);
        
        expect(userPaymentArray.every(payment => {return payment.memberId === testUserId })).to.be.true  
    })

    it ("Payment Controller:: Deletes Payment tests successfully deletes a user in DB", async()=>{
        await User.deleteMany({});
        await Payments.deleteMany({});
        const users = [
            {firstName: "mahkel", lastName: "test", email: "mahkel1@example.com", password: "testpassword"},
            {firstName: "donggyu", lastName: "test", email: "donggyu1@example.com", password: "testpassword"},
            {firstName: "michael", lastName: "test", email: "michael1@example.com", password: "testpassword"}
        ];
        
        
        const createUsers = users.map(user => userController.createUser(user));
        await Promise.all(createUsers);

        const userInstance = await User.find({}).exec();
       
        let createPayments = userInstance.map(async(data)=>{
            
            let memberId = data._id?.valueOf().toString();
            
            let payments = []
            for (let i = 0; i < 3 ; i++){
                
                const paymentInfo = {
                    memberId: memberId,
                    paymentAmount: Math.floor(Math.random() * (69-3)+3),
                    paymentDate: new Date(),
                    paymentStatus: Status[Math.floor(Math.random()*(3-0))].toString()
                };
                
                payments.push(paymentController.createPayment(paymentInfo));
                
            }
                return Promise.all(payments)
            
        })
        await Promise.all(createPayments);

        let getPaymentHistory = await paymentController.getPaymentHistory()
        
        const paymentsArray = Object.values(getPaymentHistory);
        expect(paymentsArray.length).to.eql(9)

        const testedId = paymentsArray[0]._id
        
        await paymentController.deletePayment(testedId)
        let getPaymentHistory2 = await paymentController.getPaymentHistory()
        const paymentsArray2 = Object.values(getPaymentHistory2);
        expect(paymentsArray2.length).to.eql(8)

        const deletedPayment = await Payments.findOne({
            _id: testedId
        })
        expect(deletedPayment).to.be.null

    })
    it("UserController::editPayment successfully edits user in DB", async () => {
        await User.deleteMany({});
        await Payments.deleteMany({});

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

                let date = new Date();
                const paymentInfo = {
                    memberId: userId?.valueOf().toString(),
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

                const newPaymentInfo = {
                    memberId: userId?.valueOf().toString(),
                    paymentAmount: 50,
                    paymentDate: date,
                    paymentStatus: Status[2].toString()
                };
                let paymentId = (paymentInstance?._id.valueOf().toString()) as string;
                await paymentController.editPayment(paymentId, newPaymentInfo)

                const newPayment = await Payments.findOne({
                    _id: paymentId,
                });
                
                expect(newPayment).to.have.property('paymentAmount', 50);
                expect(newPayment).to.have.property('paymentStatus', "Rejected");
            } else {
                expect.fail("No user found with that email");
            }
        } catch (err) {
            console.error(err);
            expect.fail("PaymentsController::editPayment failed");
        }
    })
})
