import {Payments, IPayments} from "../database/models/Payments";

export default class PaymentsContrtoller {

    // i made the schema now I am passing in and saving what i am inputing into the db
    public async createPayments (newPaymentsInfo: IPayments ): Promise<void>{
        
        const newPayment = new Payments(newPaymentsInfo);
        try {
            await newPayment.save();
        }catch (err){
            console.log(err);
        }
    }

    public async deletePayment(paymentId: string): Promise<void> {
        await Payments.findByIdAndDelete(paymentId).exec();
    }

    public async editPayment(paymentId: string, newInfo: IPayments): Promise<void> {
        await Payments.findByIdAndUpdate(paymentId, newInfo).exec();
    }
    //need function to order payment by date
    
    





}