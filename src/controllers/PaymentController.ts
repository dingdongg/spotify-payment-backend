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
    
    public async createPaymentHistory (): Promise<Object> {
        const payments = await Payments.find().sort({paymentDate: 1}).exec();
        return payments;
    }

    public async findUserHistory(userId: string): Promise<Object>{
        const payments = await Payments.find({memberId: userId}).sort({paymentDate: 1}).exec();
        return payments;
    }


}