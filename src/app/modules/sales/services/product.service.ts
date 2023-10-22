import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { ProductProvider } from './productProvider';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productProvider: ProductProvider) { }
  getlistProduct(): IProduct[] {
    return this.productProvider.getlistProduct();
  }
}
