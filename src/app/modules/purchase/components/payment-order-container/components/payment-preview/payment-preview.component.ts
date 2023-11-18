import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-payment-preview',
  templateUrl: './payment-preview.component.html',
  styleUrls: ['./payment-preview.component.css']
})
export class PaymentPreviewComponent {
onEdit() {
throw new Error('Method not implemented.');
}
supplier:any = {
   
    socialReason: "ABC Corporation",
    fantasyName: "Fantasy Suppliers",
    cuit: "123-456-789",
    address: "123 Main Street, Cityville"
    
}

products: any[] = [];

onSubmit(): void {
  Swal.fire({title: 'Success!', text: "Orden de pago creada", icon: 'success', confirmButtonText: 'ok'})
} 

}
