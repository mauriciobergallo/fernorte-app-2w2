import { Component, OnInit } from '@angular/core';
import { IPaymentMethod } from '../../interfaces/ipayment-method';
import { PaymentMethodService } from '../../services/payment-method.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  payment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0 };
  editPayment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0 };
  paymentMethods: IPaymentMethod[] = [];
  editForm: FormGroup;


  constructor(private paymentMethodService: PaymentMethodService, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      paymentMethod: ['', [Validators.required]],
      surcharge: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadPaymentMethods();
  }


  loadPaymentMethods() {
    this.paymentMethodService.getPaymentMethods().subscribe({
      next: (methods) => {
        this.paymentMethods = methods;
        console.log("payment Methods: ", methods)
      },
      error: (err) => {
        alert("error")
      }
    })
  }


  updatePaymentMethod() {
    if(this.editForm.get('paymentMethod')?.value == "" && this.editForm.get('surcharge')?.value == 0){
      Swal.fire({
        title: "Error!",
        text: "Presione cancelar y seleccione un metodo de pago",
        icon: "warning"
      });
    }
    if (this.editForm && this.editForm.valid)
      this.paymentMethodService.updatePaymentMethod(this.editPayment).subscribe({
        next: (method) => {
          console.log('Método de pago actualizado:', method);
          this.loadPaymentMethods();
          this.editForm.reset();
          this.editPayment = { id_payment_method: 0, payment_method: '', surcharge: 0 };
          {
            Swal.fire({
              title: "Actualización exitosa!",
              text: "El metodo de pago fue actualizado exitosamente!",
              icon: "success"
            });
          }
        },
        error: (err) => {
          Swal.fire({
            title: "Error!",
            text: "Contacte con soporte",
            icon: "warning"
          });
        }
      })
  }

  loadEditarForm(method: IPaymentMethod) {

    this.editPayment.id_payment_method = method.id_payment_method;
    this.editPayment.payment_method = method.payment_method;
    this.editPayment.surcharge = method.surcharge;

  }
}
