export class DetailBillView { 
    nameProduct: string = "";
    id: number = 0;
    idProduct: number = 0;
    quantity: number = 0;
    unitaryPrice: number = 0;
    unit: string = "";
    discountAmount: number = 0;
    tax!:Tax;
    
}

    export class Tax {
        id: number = 0;
        taxValue: number = 0;
        taxType: string = "";
    }