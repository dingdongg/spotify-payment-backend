import { Schema, model } from "mongoose";



enum Status {
    Accepted,
    Pending,
    Rejected
} 

export interface IPayments {

    memberId: Schema.Types.ObjectId,
    payment:string,
    paymentAmount: number,
    paymentDate:number,
    paymentStatus: Status

}


const paymentsSchema = new Schema <IPayments>({
    memberId: { type: Schema.Types.ObjectId, required: true},
    payment:  { type: String, required: true},
    paymentAmount: { type: Number, required: true },
    paymentDate: { type: Number, required: true }

})

export const Payments = model<IPayments>("Payment", paymentsSchema);