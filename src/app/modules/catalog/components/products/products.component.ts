import { Component } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { PRODUCT_LIST } from '../data/products-data';

@Component({
  selector: 'fn-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: IProduct[] = PRODUCT_LIST;

  currentPage = 1;
  itemsPerPage = 10;

  get pagedProducts(): IProduct[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
