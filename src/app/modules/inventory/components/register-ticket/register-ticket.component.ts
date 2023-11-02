import { Component } from '@angular/core';
import { ILocationInfoProduct } from '../../models/ilocation-info-product';
@Component({
  selector: 'fn-register-ticket',
  templateUrl: './register-ticket.component.html',
  styleUrls: ['./register-ticket.component.css']
})
export class RegisterTicketComponent {
  productList: ILocationInfoProduct[] = [];
  onProductAdded(productList: ILocationInfoProduct[]) {
    this.productList = productList;}
}
