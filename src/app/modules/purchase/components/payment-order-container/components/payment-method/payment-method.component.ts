import { Component, OnInit } from '@angular/core';
import { PaymentOrderDetailsRequest } from 'src/app/modules/purchase/models/IPaymentOrder';
import { PurchaseOrderService } from '../payment-order-grid/services/purchase-order.service';
import { IPurchaseOrder } from '../payment-order-grid/models/PurchaseOrder';

@Component({
  selector: 'fn-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit{

  constructor(private _purchaseOrdersService:PurchaseOrderService){}
  selectedPurchase: IPurchaseOrder[]=[];

  
  paymentOrderDetails: PaymentOrderDetailsRequest[] = [
    {
      purchaseOrderId: 1,
      paymentOrderId: 2,
      amount: 1200,
      paymentMethod: 'CASH',
      observation: 'algo'
    },
    {
      purchaseOrderId: 1,
      paymentOrderId: 2,
      amount: 1200,
      paymentMethod: 'CASH',
      observation: 'algo'
    },
    {
      purchaseOrderId: 1,
      paymentOrderId: 2,
      amount: 1200,
      paymentMethod: 'CASH',
      observation: 'algo'
    },
    {
      purchaseOrderId: 1,
      paymentOrderId: 2,
      amount: 1200,
      paymentMethod: 'CASH',
      observation: 'algo'
    },
    {
      purchaseOrderId: 1,
      paymentOrderId: 2,
      amount: 1200,
      paymentMethod: 'CASH',
      observation: 'algo'
    },
    {
      purchaseOrderId: 1,
      paymentOrderId: 2,
      amount: 1200,
      paymentMethod: 'CASH',
      observation: 'algo'
    }
  ];

  totals: any = {
    total: 0,
    cash: 0,
    debit: 0,
    credit: 0
  };

  calculateTotals(): void {
    this.totals.total = 0;
    this.totals.cash = 0;
    this.totals.debit = 0;
    this.totals.credit = 0;

    // Utiliza selectedPurchase en lugar de paymentOrderDetails
    for (let i = 0; i < this.selectedPurchase.length; i++) {
      this.totals.total += this.selectedPurchase[i].total;

      if (this.selectedPurchase[i].purchaseDetails) {
        for (let j = 0; j < this.selectedPurchase[i].purchaseDetails.length; j++) {
          const amount = this.selectedPurchase[i].total;
          const paymentMethod = this.selectedPurchase[i].paymentMethod;

          if (paymentMethod === 'CASH') {
            this.totals.cash += amount;
          }
          if (paymentMethod === 'DEBIT') {
            this.totals.debit += amount;
          }
          if (paymentMethod === 'CREDIT') {
            this.totals.credit += amount;
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.calculateTotals();
    this.selectedPurchase = this._purchaseOrdersService.getSelectedPurchaseOrders();
  }

  

}
