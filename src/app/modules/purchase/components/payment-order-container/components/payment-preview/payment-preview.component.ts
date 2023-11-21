import { Component } from '@angular/core';
import { PaymentOrderDetailResponse, PaymentOrderDetailsRequest, PaymentOrderRequest } from 'src/app/modules/purchase/models/IPaymentOrder';
import Swal from 'sweetalert2';
import { PaymentOrderServiceService } from '../../services/payment-order-service.service';
import { IPurchaseOrder } from '../payment-order-grid/models-payment-order-grid/IPurchaseOrderForGrid';
import { PurchaseOrderService } from '../payment-order-grid/services/payment-order-grid.service';

@Component({
  selector: 'fn-payment-preview',
  templateUrl: './payment-preview.component.html',
  styleUrls: ['./payment-preview.component.css']
})
export class PaymentPreviewComponent {
  currentDate: Date = new Date();

onEdit() {
throw new Error('Method not implemented.');
}

selectedPurchase: IPurchaseOrder[]=[];
paymentOrderDetails: PaymentOrderDetailsRequest[] = [];
constructor(private _paymentOrderService: PaymentOrderServiceService,private _purchaseOrdersService:PurchaseOrderService){}
/* supplier:any = {
   
    socialReason: "ABC Corporation",
    fantasyName: "Fantasy Suppliers",
    cuit: "123-456-789",
    address: "123 Main Street, Cityville"
    
} */

ngOnInit(){
  this.paymentOrderDetails = this._paymentOrderService.getPaymentOrderDetails();
  this.selectedPurchase = this._purchaseOrdersService.getSelectedPurchaseOrders();
}




onSubmit(): void {
  const paymentOrderRequest: PaymentOrderRequest = {
    date: this.currentDate,
    paymentDetails: this.paymentOrderDetails,
    employeeId: 1, // Set the employeeId as per your requirement
    observation: "Observation to go to database",
     // Set the observation as per your requirement
  };
  console.log(this.paymentOrderDetails);
  this._paymentOrderService.createPaymentOrder(paymentOrderRequest).subscribe(
    response => {
      // Handle success
      Swal.fire('Éxito', 'La orden de pago se creó correctamente', 'success');
      console.log(response);
      console.log(this.paymentOrderDetails);
      // Reset the payment details after submission if needed
      this._paymentOrderService.clearPaymentOrderDetails();
      // Update the payment flow to GRID
      
    },
    error => {
      // Handle error
      Swal.fire('Error', 'Hubo un problema al crear la orden de pago', 'error');
    }
  );
  this.paymentOrderDetails = [];
} 

}
