import { Component } from '@angular/core';

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

}
