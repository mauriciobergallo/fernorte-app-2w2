// payment-method.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPaymentMethod } from '../../interfaces/ipayment-method';
import { PaymentMethodService } from '../../services/payment-method.service';

@Component({
  selector: 'fn-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  payment: IPaymentMethod = { idPaymentMethod: 0, paymentMethod: '', surcharge: 0 };
  editPayment: IPaymentMethod = { idPaymentMethod: 0, paymentMethod: '', surcharge: 0 };
  paymentMethods: IPaymentMethod[] = [];
  methodForm: FormGroup;

  constructor(private paymentMethodService: PaymentMethodService, private formBuilder: FormBuilder,private formGroup: FormGroup) {
    this.methodForm = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      surcharge: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  saveNewPaymentMethod() {
    if (this.methodForm && this.methodForm.valid) {
      this.payment.paymentMethod = this.methodForm.get('paymentMethod')?.value || '';
      this.payment.surcharge = this.methodForm.get('surcharge')?.value || 0;
  
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

  updatePaymentMethod(editPayment: IPaymentMethod) {
    this.paymentMethodService.updatePaymentMethod(this.editPayment).subscribe(
      (response) => {
        console.log('Método de pago actualizado:', response);
        this.loadPaymentMethods();
        this.editPayment = { idPaymentMethod: 0, paymentMethod: '', surcharge: 0 };
      },
      (error) => {
        console.error('Error al actualizar el método de pago:', error);
      }
    );
  }

  loadEditarForm(method: IPaymentMethod) {
    this.editPayment.idPaymentMethod = method.idPaymentMethod;
    this.editPayment.paymentMethod = method.paymentMethod;
    this.editPayment.surcharge = method.surcharge;
  }
}
