import { Component, OnInit } from '@angular/core';
import { IPaymentMethod } from '../../interfaces/ipayment-method';
import { PaymentMethodService } from '../../services/payment-method.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fn-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  payment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0 };
  editPayment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0 };
  paymentMethods: IPaymentMethod[] = [];
  methodForm: FormGroup;
  editForm: FormGroup;


  constructor(private paymentMethodService: PaymentMethodService, private formBuilder: FormBuilder) {
    this.methodForm = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      surcharge: [0, Validators.required],
    });

    this.editForm = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      surcharge: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  saveNewPaymentMethod() {

    if (this.editForm && this.editForm.valid) {
      this.payment.id_payment_method = 0;
      this.payment.payment_method = this.editForm.get('paymentMethod')?.value || '';
      this.payment.surcharge = this.editForm.get('surcharge')?.value || 0;
      this.editForm.get('paymentMethod')?.setValue('');
      this.editForm.get('surcharge')?.setValue(0);

      this.paymentMethodService.createPaymentMethod(this.payment).subscribe({
        next:(methods) => {
          console.log('Nuevo método de pago creado:', methods);
          this.loadPaymentMethods();  
        },
        error:(err)=>{
          alert("error")
        }
      })
    }
  }

  loadPaymentMethods() {
    this.paymentMethodService.getPaymentMethods().subscribe({
      next:(methods) => {
        this.paymentMethods = methods;
        console.log("payment Methods: ", methods)
      },
      error:(err)=>{
        alert("error")
      }
    })
  }
  

  updatePaymentMethod() {
    if (this.editForm && this.editForm.valid)
      this.paymentMethodService.updatePaymentMethod(this.editPayment).subscribe({
      next:(method) => {
        console.log('Método de pago actualizado:', method);
        this.loadPaymentMethods();
        this.editForm.get('paymentMethod')?.setValue('');
        this.editForm.get('surcharge')?.setValue(0);
        this.editPayment = { id_payment_method: 0, payment_method: '', surcharge: 0 };
      },
      error:(err)=>{
        alert("error")
      }
    })
  }
  
  loadEditarForm(method: IPaymentMethod) {

    this.editPayment.id_payment_method = method.id_payment_method;
    this.editPayment.payment_method = method.payment_method;
    this.editPayment.surcharge = method.surcharge;
    
  }
}
