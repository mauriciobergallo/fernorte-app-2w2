export class MontoTotalModel {
    subTotal: number  = 0;
    impuesto: number = 21;
    readonly total: number = this.impuesto + this.subTotal;
}
