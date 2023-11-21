export class MontoTotalModel {
    subTotal: number  = 0;
    impuesto: number = 21;
    total: number = this.subTotal + (this.subTotal * (this.impuesto / 100))
}
