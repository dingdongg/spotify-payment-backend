import { Schema, model } from "mongoose";

export interface IPayment {

    memberId: Object |undefined ,
    paymentAmount: Number,
    paymentDate:Date,
    paymentStatus: String;

}

const paymentsSchema = new Schema <IPayment>({
    memberId: { type: Object, required: true, ref: 'User'},
    paymentAmount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    paymentStatus: { type: String, required: true }

})

export const Payments = model<IPayment>("Payment", paymentsSchema);