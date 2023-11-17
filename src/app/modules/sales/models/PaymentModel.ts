import { PaymentMethod } from "./PaymentMethodModel";

export class Payment {
    id?: number = 0;
    payment: number = 0;
    surcharge:number=0;
    paymentMethod : PaymentMethod= new PaymentMethod;
}