import { Component, OnInit } from '@angular/core';
import { IPaymentMethod } from '../../interfaces/ipayment-method';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentMethodService } from '../../services/payment-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-payment-method-register',
  templateUrl: './payment-method-register.component.html',
  styleUrls: ['./payment-method-register.component.css']
})
export class PaymentMethodRegisterComponent implements OnInit {
  payment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0,isDeleted:false  };
  registerForm: FormGroup;


  constructor(private paymentMethodService: PaymentMethodService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      surcharge: [0, [Validators.required,Validators.min(0)]],
    });
  }

  ngOnInit(): void {
  }

  saveNewPaymentMethod() {

    if (this.registerForm && this.registerForm.valid) {
      this.payment.id_payment_method = 0;
      this.payment.payment_method = this.registerForm.get('paymentMethod')?.value || '';
      this.payment.surcharge = this.registerForm.get('surcharge')?.value || 0;
      this.registerForm.get('paymentMethod')?.setValue('');
      this.registerForm.get('surcharge')?.setValue(0);


      this.paymentMethodService.createPaymentMethod(this.payment).subscribe({
        next:(methods) => {
          this.registerForm.reset();
          Swal.fire({
            title: "Agregado exitoso!",
            text: "El metodo de pago fue agregado exitosamente!",
            icon: "success"
          });
        },
        error:(err)=>{
          alert("error")
        }
      })
    }
  }
}
