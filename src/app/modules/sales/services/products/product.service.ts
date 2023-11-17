import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { ProductProvider } from './productProvider';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private productProvider: ProductProvider) { }
  private listProduct: ProductModel[] = [];

  getlistProduct(): ProductModel[] {
    this.productProvider.getListProduct().subscribe((res) => {
      this.listProduct = res
      return this.listProduct;

    });
    return this.listProduct;
  }


  restarCantidad(productoSeleccionado: ProductModel) {
    this.listProduct = this.listProduct.map(x => {
      if (x.idProduct == productoSeleccionado.idProduct)
        x.stockQuantity = x.stockQuantity - productoSeleccionado.cantidadSeleccionado!

      return x;
    })
    return this.listProduct;
  }
  filtrarProductos(texto: any) {
    if (texto.target && texto.target.value && texto.target.value.trim() !== '') {
      return this.listProduct.filter(producto => producto.name.toLowerCase().includes(texto.target.value.toLowerCase()));
    } else {
      return [];
    }
  }
  cleanProduct(): ProductModel {
    let productoSeleccionado = {
      idProduct: 0,
      name: "",
      description: "",
      unitPrice: 0,
      stockQuantity: 0,
      unitOfMeasure: "",
      category: {
        idCategory: 0,
        name: "",
        description: ""
      },
      urlImage: "",
      priceProduct: 0,
      discount: 0,
      cantidadSeleccionado: 1
    }

    return productoSeleccionado;
  }

}
