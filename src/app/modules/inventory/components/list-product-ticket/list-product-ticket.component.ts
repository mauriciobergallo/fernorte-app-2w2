import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILocationInfoProduct } from '../../models/ilocation-info-product';
import { TicketService } from '../../services/Ticket/ticket.service';
import { IticketStorage } from '../../models/iticket-storage';

@Component({
  selector: 'fn-list-product-ticket',
  templateUrl: './list-product-ticket.component.html',
  styleUrls: ['./list-product-ticket.component.css']
})
export class ListProductTicketComponent {
  @Input() productList: ILocationInfoProduct[] = [];
  @Output() productListUpdated = new EventEmitter<ILocationInfoProduct[]>();
  constructor(private ticketService: TicketService) {}


  addProductToList(product:ILocationInfoProduct) {
    this.productList.push(product);
  }

deleteProduct(product: ILocationInfoProduct) {
  const index = this.productList.indexOf(product);
  
  if (index !== -1) {
    this.productList.splice(index, 1);
    this.productListUpdated.emit(this.productList);
  }
}

executeEndpointForAllProducts() {
  for (const product of this.productList) {
    const ticketStorage: IticketStorage = {
      product_id: product.product_id,
      location_id: product.location.id,
      quantity: product.quantity,
      created_by: 'TEST USER',
      remarks: 'X'
    };
    
    this.ticketService.createStorageTicket(ticketStorage).subscribe(
      (response) => {
        console.log('Solicitud POST exitosa:', response);
      },
      (error) => {
        console.error('Error al realizar la solicitud POST:', error);
      }
    );
  }
  this.productList = [];
  this.productListUpdated.emit(this.productList);
  alert("TICKET CREATED SUCCESSFULLY");

}
}
