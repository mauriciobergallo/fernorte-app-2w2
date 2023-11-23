import { Component,OnInit } from '@angular/core';
import { BillView } from '../../models/BillView';
import { BillOk } from '../../models/BillingOk';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintDocumentsService } from '../../services/print/print-documents-service';
import { Payment } from '../../models/PaymentModel';
@Component({
  selector: 'fn-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit{
exit() {
  this.router.navigateByUrl('')
} 

  bill!: BillView;
  subscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, private printService: PrintDocumentsService) {}

    
    subtotal:number = 0;
    iva: number = 0;

    
  

  /* 
    bill1: BillView = {
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
      payment_method:{
      id_payment_method: 2,
       payment_method: "Credit Card",
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
  } */

  ngOnInit(): void {
      this.subscription = this.printService.getBillOrder$.subscribe((bill) => {
        this.bill = bill;
      });
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




