import { Component, Output, EventEmitter } from '@angular/core';
import { TicketService } from '../../services/Ticket/ticket.service';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ILocationInfoProduct } from '../../models/ilocation-info-product';

@Component({
  selector: 'fn-add-product-ticket',
  templateUrl: './add-product-ticket.component.html',
  styleUrls: ['./add-product-ticket.component.css']
})
export class AddProductTicketComponent {
  @Output() listProductEmmit = new EventEmitter<ILocationInfoProduct[]>();
  productId: any;
  errorMessage: string | null = null;
  unitOfMeasure: string = '';
  zone: string = ''; 
  section: string = '';
  space: string = '';
  locationProduct : any;
  quantity : number = 0;
  errorMessageAdd: string | null = null;
  listProduct: ILocationInfoProduct[] = [];

  constructor(private ticketService: TicketService) {}

  addProduct() {
    const isProductInList = this.listProduct.some(product => product.product_id == this.productId);
  
    if (isProductInList) {
      this.errorMessageAdd = 'El producto ya está en la lista.';
    } else {
      this.ticketService.getStorageAvailability(this.productId, this.quantity).subscribe(
        (storageAvailability) => {
          if (storageAvailability.available) {
            this.errorMessageAdd = '';
            this.locationProduct.quantity = this.quantity;
            this.listProduct.push(this.locationProduct);
            this.listProductEmmit.emit(this.listProduct);
            this.productId = null;
            this.quantity = 0;
            this.unitOfMeasure = '';
            this.zone = '';
            this.section = '';
            this.space = '';
            this.errorMessageAdd = null;
          } else {
            this.errorMessageAdd = `Producto no disponible en la cantidad especificada. Disponible ${storageAvailability.current_capacity}`;
          }
        },
        (error) => {
          this.errorMessageAdd = 'Error al verificar la disponibilidad del producto.';
        }
      );
    }
  }

  searchProduct() {
    this.ticketService.getProductByCode(this.productId).subscribe(
      (products) => {
        if (!products) {
          this.errorMessage = 'Producto no existe';
        } else {
          this.errorMessage = null;
          this.unitOfMeasure = products.measure_unit;
          this.zone = products.location.zone;
          this.section = products.location.section;
          this.space = products.location.space;
          this.locationProduct = products;
        }
      },
      (error) => {
        this.errorMessage = 'Error al buscar el producto';
        this.unitOfMeasure = '';
        this.zone = '';
        this.section= '';
        this.space = '';
        this.locationProduct = null;

      }
    );
  }

  handleInput(event: any) {
    if (event.target) {
      this.productId = event.target.valueAsNumber;
    }
  }



}
