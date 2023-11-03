import { Component } from '@angular/core';
import { PaymentFlow } from '../../models/IPaymentOrder';
import { PaymentOrderServiceService } from './services/payment-order-service.service';

@Component({
  selector: 'fn-payment-order-container',
  templateUrl: './payment-order-container.component.html',
  styleUrls: ['./payment-order-container.component.css']
})
export class PaymentOrderContainerComponent {

  constructor(private _paymentOrderService: PaymentOrderServiceService){}

  paymentOrderFlow: PaymentFlow = 'GRID';

  ngOnInit(){
    this._paymentOrderService.getPaymentOrderFlow().subscribe(flow => this.paymentOrderFlow = flow)
  }

  setPaymentOrderFlow(): void {
    this.paymentOrderFlow === 'METHODS' 
      ? this._paymentOrderService.setPaymentOrderFlow('PREVIEW') 
      : this._paymentOrderService.setPaymentOrderFlow('METHODS')
  }

}
