import { Component, OnInit } from '@angular/core';
import { IPaymentMethod } from '../../interfaces/ipayment-method';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'fn-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  payment: IPaymentMethod = { idPaymentMethod: 0, paymentMethod: '', surcharge: 0 };
  paymentMethods: IPaymentMethod[] = [];

  constructor(private paymentMethodService: PaymentMethodService) { }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  saveNewPaymentMethod(formDatos: any) {
    console.log(this.payment);
    this.paymentMethodService.createPaymentMethod(this.payment).subscribe(
      (response) => {
        console.log('Nuevo método de pago creado:', response);
        this.loadPaymentMethods();
      },
      (error) => {
        console.error('Error al crear el método de pago:', error);
      }
    );
  }

  loadPaymentMethods() {
    this.paymentMethodService.getPaymentMethods().subscribe(
      (methods) => {
        this.paymentMethods = methods;
      },
      (error) => {
        console.error('Error al cargar la lista de métodos de pago:', error);
      }
    ); 
  }

  selectPaymenthMethod(payment:IPaymentMethod){
    this.payment.idPaymentMethod = payment.idPaymentMethod;
    this.payment.paymentMethod = payment.paymentMethod;
    this.payment.surcharge = payment.surcharge;
  }
}
