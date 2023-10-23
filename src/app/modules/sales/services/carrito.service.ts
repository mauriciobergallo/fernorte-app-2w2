import { Injectable } from '@angular/core';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  private carrito: ProductModel[] = []

  consultarCarrito = () => this.carrito;

  agregarCarrito(productoSeleccionado: ProductModel): ProductModel[] {
    this.carrito.push(productoSeleccionado)
    return this.carrito;
  }
  validarProductoCargado = (productoSelecionado: ProductModel): boolean =>
    this.carrito.some(x => x.codigo == productoSelecionado.codigo);

  deleteProduct(id: string):ProductModel[] {
    const index = this.carrito.findIndex(producto => producto.codigo === id);

    if (index !== -1) {
      this.carrito.splice(index, 1);
    }

    return this.carrito.slice();
  }
}
