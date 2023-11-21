import { Component } from '@angular/core';
import { PaymentFlow, PaymentOrderDetailsRequest } from '../../models/IPaymentOrder';
import { PaymentOrderServiceService } from './services/payment-order-service.service';
import { PurchaseOrderService } from './components/payment-order-grid/services/payment-order-grid.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'fn-payment-order-container',
  templateUrl: './payment-order-container.component.html',
  styleUrls: ['./payment-order-container.component.css']
})
export class PaymentOrderContainerComponent {


  constructor(private _paymentOrderService: PaymentOrderServiceService,private _purchaseOrdersService:PurchaseOrderService){}

  paymentOrderFlow: PaymentFlow = 'GRID';

  ngOnInit(){
    this._paymentOrderService.getPaymentOrderFlow().subscribe(flow => this.paymentOrderFlow = flow)
  }

  setPaymentOrderFlow(): void {
    this.paymentOrderFlow === 'METHODS' 
      ? this._paymentOrderService.setPaymentOrderFlow('PREVIEW') 
      : this._paymentOrderService.setPaymentOrderFlow('METHODS')
  }
  setPayment() {
    if (this._purchaseOrdersService.getSelectedPurchaseOrders().length == 0) {
      console.log(this._purchaseOrdersService.getSelectedPurchaseOrders().length);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No seleccionaste ninguna orden',
      });

    }else{
      this.setPaymentOrderFlow();
    }
    
    

  }

  paymentOrderDetails: PaymentOrderDetailsRequest[] = [];
  checkDetailsNotNull(){
    this.paymentOrderDetails = this._paymentOrderService.getPaymentOrderDetails();
   
    const hasNullPaymentMethod = this.paymentOrderDetails.some(detail => detail.paymentMethod === null);
   

    if (hasNullPaymentMethod) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor seleccione un metodo de pago para todas las ordenes de compra',
      });
    } else {
      // If all payment details have a valid paymentMethod, proceed with saving
      this.setPaymentOrderFlow();

      // Perform the logic to save paymentOrderDetails
    }
  }
}
