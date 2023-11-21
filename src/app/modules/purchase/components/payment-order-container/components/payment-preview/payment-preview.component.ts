import { Component } from '@angular/core';
import {
  PaymentFlow,
  PaymentOrderDetailsRequest,
  PaymentOrderRequest,
} from 'src/app/modules/purchase/models/IPaymentOrder';
import Swal from 'sweetalert2';
import { PaymentOrderServiceService } from '../../services/payment-order-service.service';
import { IPurchaseOrder } from '../payment-order-grid/models-payment-order-grid/IPurchaseOrderForGrid';
import { PurchaseOrderService } from '../payment-order-grid/services/payment-order-grid.service';

@Component({
  selector: 'fn-payment-preview',
  templateUrl: './payment-preview.component.html',
  styleUrls: ['./payment-preview.component.css'],
})
export class PaymentPreviewComponent {
  currentDate: Date = new Date();
  paymentOrderFlow: PaymentFlow = 'PREVIEW';
  selectedPurchase: IPurchaseOrder[] = [];
  paymentOrderDetails: PaymentOrderDetailsRequest[] = [];
  constructor(
    private _paymentOrderService: PaymentOrderServiceService,
    private _purchaseOrdersService: PurchaseOrderService
  ) {}

  ngOnInit() {
    this.paymentOrderDetails =
      this._paymentOrderService.getPaymentOrderDetails();
    this.selectedPurchase =
      this._purchaseOrdersService.getSelectedPurchaseOrders();
  }

  onSubmit(): void {
    const paymentOrderRequest: PaymentOrderRequest = {
      date: this.currentDate,
      paymentDetails: [...this.paymentOrderDetails],
      employeeId: 1, // TODO
      observation: 'Observation to go to database',
     
    };
    console.log(paymentOrderRequest);
    this._paymentOrderService.createPaymentOrder(paymentOrderRequest).subscribe(
      (response) => {
        console.log(response);
        // Handle success
        Swal.fire('Éxito', 'La orden de pago se creó correctamente', 'success');
        // Reset the payment details after submission if needed
        this._paymentOrderService.clearPaymentOrderDetails();
        // Update the payment flow to GRID
        this._paymentOrderService.setPaymentOrderFlow('GRID')
      },
      (error) => {
        // Handle error
        console.log(error)
        Swal.fire(
          'Error',
          'Hubo un problema al crear la orden de pago',
          'error'
        );
        this._paymentOrderService.clearPaymentOrderDetails();
      }
    );
    this.paymentOrderDetails = [];
  }

  setPaymentOrderFlow(): void {
    this.paymentOrderFlow === 'PREVIEW' 
      ? this._paymentOrderService.setPaymentOrderFlow('METHODS') 
      : this._paymentOrderService.setPaymentOrderFlow('PREVIEW')
  }

  onEdit() {
    this._paymentOrderService.clearPaymentOrderDetails();
    this.setPaymentOrderFlow();
  }

}
