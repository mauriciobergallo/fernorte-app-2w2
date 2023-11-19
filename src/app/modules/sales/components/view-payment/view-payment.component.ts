import { Component,OnInit } from '@angular/core';
import { BillView } from '../../models/BillView';
@Component({
  selector: 'fn-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit{ 


  
    bill: BillView = {
    idBill: 100,
    idSeller: 2,
    firstNameSeller:  "Nicolas",
    lastNameSeller: "Senestrari",
    idClient: 1,
    firstNameClient: "Macarena",
    lastNameClient: "Caridad",
    companyName:  "",
    address: "Bv Illia 1640",
    telephone:3513064323,
    cae: "cae",
    email: "maca@hotmail.com",
    createdDate: "20/10/23",
    expirationDateCae: "30/10/23",
    vatCondition: "...",
    billType: "C",
    totalPrice:2000,
    payment:{
      id:2,
    paymenMetod:{
      idPaymentMethod: 2,
      paymentMethod: "Credit Card",
      surcharge: 80
    },
    surcharge: 2,
    payment: 32,

    },
    idSaleOrder:2,
    detailBill: [
      { nameProduct: "Martillo",
    id: 1,
    idProduct:8,
    quantity:  1,
    unitaryPrice: 1000,
    unit: "$",
    discountAmount:0,
    tax:
    {  id: 1,
      taxValue:20,
      taxType: "Iva"
    }
  },
    { nameProduct: "Serrucho",
    id: 3,
    idProduct:4,
    quantity:  2,
    unitaryPrice: 1000,
    unit: "$",
    discountAmount: 50,
    tax:
    {  id: 5,
      taxValue:2,
      taxType: "Iva"
    }
  },
    { nameProduct: "Clavo",
    id: 3,
    idProduct:43,
    quantity:  2,
    unitaryPrice: 100,
    unit: "$",
    discountAmount: 50,
    tax:
    {  id: 5,
      taxValue:2,
      taxType: "Iva"
    }
  }]
  }
  subtotal:number = 0;
  iva: number = 0;
  saleOrderId: number = 0;

  constructor() {}

  ngOnInit(): void {
  /*  this.activatedRoute.paramMap.subscribe(s => {
      this.saleOrderId = +s.get('id')!});
      this.saleOrderService.getSaleOrdersById(this.saleOrderId).subscribe((x)=>{
      this.listSaleOrder = x;
      });    */

      this.calculateSub();
    this.calculateIva();

  }
  calculateSub(){
    this.bill.detailBill.forEach(detail=>{
      this.subtotal+= detail.quantity*detail.unitaryPrice;
    })
  }
  calculateIva(){
    this.iva = this.subtotal * 0.21;
  }
  
}
