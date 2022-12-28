import {Payments, IPayment} from "../database/models/Payments";
import * as cron from "node-cron";

export default class PaymentsController {

    // i made the schema now I am passing in and saving what i am inputing into the db
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
    
    public cronPayment (): void{
        cron.schedule ("*/10 * * * * *", ()=>{
            console.log("testing cron");
        });

    }
    





}