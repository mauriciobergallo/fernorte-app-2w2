import { Component, OnInit } from '@angular/core';
import { PaymentOrderDetailsRequest, PaymentOrderRequest } from 'src/app/modules/purchase/models/IPaymentOrder';
import { PurchaseOrderService } from '../payment-order-grid/services/purchase-order.service';
import { IPurchaseOrder } from '../payment-order-grid/models/PurchaseOrder';
import { PaymentMethod } from 'src/app/modules/purchase/models/IPaymentOrder';
import { PaymentOrderServiceService } from '../../services/payment-order-service.service';

@Component({
  selector: 'fn-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit{


  constructor(private _purchaseOrdersService:PurchaseOrderService,private _paymentOrderService: PaymentOrderServiceService){}
  selectedPurchase: IPurchaseOrder[]=[];

  
  paymentOrderDetails: PaymentOrderDetailsRequest[] = [];

    

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
      const amount = this.paymentOrderDetails[i].amount;
      const paymentMethod = this.paymentOrderDetails[i].paymentMethod;
  
      this.totals.total += amount;
  
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
  

  ngOnInit(): void {
    this.calculateTotals();
    this.selectedPurchase = this._purchaseOrdersService.getSelectedPurchaseOrders();
    this.updatePaymentOrderDetails();

   
    
    
  }
  private updatePaymentOrderDetails(): void {
    this.paymentOrderDetails = this.selectedPurchase.map(purchase => {
      return {
        purchaseOrderId: purchase.id,
        paymentOrderId: 0,
        amount: purchase.total,
        paymentMethod: null, // Set the payment method based on your requirements
        observation: purchase.observation,
        date:purchase.date
      } as PaymentOrderDetailsRequest;
    });

    this.paymentOrderDetails.forEach(detail => {
      this._paymentOrderService.setPaymentOrderDetails(detail);
    });
    
  }

  
  ngOnChanges(): void {
    this.updatePaymentOrderDetails();
    
  }
  savePaymentOrderDetails() {
    
    const hasNullPaymentMethod = this.paymentOrderDetails.some(detail => detail.paymentMethod === null);

    if (hasNullPaymentMethod) {
      // Display an alert message
      alert('Por favor seleccione un metodo de pago para todas las ordenes de compra');
    } else {
      // If all payment details have a valid paymentMethod, proceed with saving
      console.log(this.paymentOrderDetails);

      // Perform the logic to save paymentOrderDetails
    }
    }

 

    
  }

  


