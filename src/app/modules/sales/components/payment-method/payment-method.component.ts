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

  payment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0, isDeleted:false };
  editPayment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0,isDeleted:false };
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
          this.editPayment = { id_payment_method: 0, payment_method: '', surcharge: 0,isDeleted:false  };
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


  deleteOrActiveMethod(paymentMethod: IPaymentMethod) {
    {
      Swal.fire({
        title: "Estas seguro?",
        text: "Puedes revertir este cambio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borralo!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Borrado!",
            text: "El metodo de pago fue eliminado.",
            icon: "success"
          });
        }
      });

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Estas seguro?",
        text: "Puedes revertir este cambio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText:  "Si, borralo!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Borrado!",
            text: "El metodo de pago fue eliminado.",
            icon: "success"
          });
          this.paymentMethodService.deleteOrUpdateMethod(paymentMethod).subscribe({
            next: (method) => {
              console.log('Método de pago actualizado:', method);
              this.loadPaymentMethods();
              
            },
            error: (err) => {
              Swal.fire({
                title: "Error!",
                text: "Contacte con soporte",
                icon: "warning"
              });
            }
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Su metodo de pago continua activo",
            icon: "error"
          });
        }
      });
  }

    }


  loadEditarForm(method: IPaymentMethod) {

    this.editPayment.id_payment_method = method.id_payment_method;
    this.editPayment.payment_method = method.payment_method;
    this.editPayment.surcharge = method.surcharge;

  }
}
