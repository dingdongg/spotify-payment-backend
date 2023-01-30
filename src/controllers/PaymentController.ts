import {Payments, IPayment} from "../database/models/Payments";

export default class PaymentController {

    public async createPayment (newPaymentsInfo: IPayment ): Promise<void>{
        
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

    public async editPayment(paymentId: string, newInfo: IPayment): Promise<void> {
        await Payments.findByIdAndUpdate(paymentId, newInfo).exec();
    }
    
    public async getPaymentHistory(): Promise<Object> {
        return await Payments.find().sort({paymentDate: 1}).exec();
        
    }

    public async findUserPaymentHistory(userId: string): Promise<Object>{
       
        return await Payments.find({memberId: userId}).sort({paymentDate: 1}).exec();
        
    }


}