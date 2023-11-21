import { Component } from '@angular/core';

@Component({
  selector: 'fn-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent {
  payment: any = {}; 

  submitForm() {
    
    console.log('Formulario enviado:', this.payment);
  }
}
