import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { ProductProvider } from '../providers/ProductProvider';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productProvider: ProductProvider) { }
  getlistProduct(): IProduct[] {
    return this.productProvider.getlistProduct();
  }
}