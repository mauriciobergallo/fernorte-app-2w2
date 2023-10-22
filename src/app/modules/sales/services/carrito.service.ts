import { Injectable } from '@angular/core';
import { ProductModel } from '../models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  private carrito:ProductModel[] = []

  consultarCarrito = () => this.carrito;

  agregarCarrito(productoSeleccionado: ProductModel):ProductModel[]{
    this.carrito.push(productoSeleccionado)
    return this.carrito;
  }  
  validarProductoCargado = (productoSelecionado: ProductModel):boolean => 
  this.carrito.some(x => x.codigo == productoSelecionado.codigo);
  
}
