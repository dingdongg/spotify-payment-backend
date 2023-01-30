import { Schema, model } from "mongoose";

export interface IPayment {

    memberId: string;
    paymentAmount: number;
    paymentDate: Date;
    paymentStatus: string;

}

const paymentsSchema = new Schema <IPayment>({
    memberId: { type: String , required: true, ref: 'User'},
    paymentAmount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    paymentStatus: { type: String, required: true }

})

export const Payments = model<IPayment>("Payment", paymentsSchema);