import { Injectable } from '@angular/core';
import { ProductModel } from '../models/ProductModel';
import { ProductProvider } from '../providers/productProvider';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productProvider: ProductProvider) { }
  private listProduct: ProductModel[] = [];

  getlistProduct(): ProductModel[] {
    this.listProduct = this.productProvider.getlistProduct();
    this.listProduct = this.listProduct.map(x => {
      x.cantidadSeleccionado = 1;
      return x;
    });
    return this.listProduct;
  }

  restarCantidad(productoSeleccionado: ProductModel) {
    this.listProduct = this.listProduct.map(x => {
      if (x.codigo == productoSeleccionado.codigo)
        x.cantidad = x.cantidad - productoSeleccionado.cantidadSeleccionado!

      return x;
    })
    return this.listProduct;
  }
  filtrarProductos(texto: any) {
    return this.listProduct.filter(producto => producto.nombre.toLowerCase().includes(texto.target.value.toLowerCase()));
  }
  cleanProduct(): ProductModel {
    let productoSeleccionado = {
      codigo: '',
      nombre: '',
      precioUnitario: 0,
      cantidad: 0,
      cantidadSeleccionado: 1
    }

    return productoSeleccionado;
  }
  
}
