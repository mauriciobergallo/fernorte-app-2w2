import { Component } from '@angular/core';
import { PaymentOrderDetailsRequest } from 'src/app/modules/purchase/models/IPaymentOrder';

@Component({
  selector: 'fn-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {

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
    
    for (let i = 0; i < this.paymentOrderDetails.length; i++) {
      this.totals.total += this.paymentOrderDetails[i].amount
      if (this.paymentOrderDetails[i].paymentMethod === 'CASH') {
        this.totals.cash += this.paymentOrderDetails[i].amount
      }
      if (this.paymentOrderDetails[i].paymentMethod === 'DEBIT') {
        this.totals.debit += this.paymentOrderDetails[i].amount
      }
      if (this.paymentOrderDetails[i].paymentMethod === 'CREDIT') {
        this.totals.credit += this.paymentOrderDetails[i].amount
      }
    }
  }

  ngOnInit(): void {
    this.calculateTotals();
  }

}
