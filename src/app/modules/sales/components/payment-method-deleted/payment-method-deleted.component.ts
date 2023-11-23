import { Component, OnInit } from '@angular/core';
import { IPaymentMethod } from '../../interfaces/ipayment-method';
import { FormGroup } from '@angular/forms';
import { PaymentMethodService } from '../../services/payment-method.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-payment-method-deleted',
  templateUrl: './payment-method-deleted.component.html',
  styleUrls: ['./payment-method-deleted.component.css']
})
export class PaymentMethodDeletedComponent implements OnInit {

  payment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0, isDeleted:false  };
  editPayment: IPaymentMethod = { id_payment_method: 0, payment_method: '', surcharge: 0, isDeleted:false  };
  paymentMethods: IPaymentMethod[] = [];

  constructor(private paymentMethodService: PaymentMethodService,) {}
  ngOnInit(): void {
    this.loadPaymentMethods();
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
        title: "Deseas revertir este cambio?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText:  "Si, revertir!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          
          swalWithBootstrapButtons.fire({
            title: "Revertido!",
            text: "El metodo de pago fue recuperado.",
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
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Su metodo de pago continua eliminado",
            icon: "error"
          });
        }
      });
  }
     
    }


loadPaymentMethods() {
  this.paymentMethodService.getInactivePaymentMethods().subscribe({
    next: (methods) => {
      this.paymentMethods = methods;

    },
    error: (err) => {
      alert("error")
    }
  })
}

}