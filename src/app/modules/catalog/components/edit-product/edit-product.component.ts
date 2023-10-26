import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/IProductCategory';

@Component({
  selector: 'fn-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  @Input() product: IProduct = {} as IProduct;

  constructor() {}

  closeModal() {
    // Implementa el cierre del modal si es necesario
  }
}
