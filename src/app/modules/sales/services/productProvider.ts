import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../enviroment/environment";
import { ISaleOrder } from "../interfaces/isale-order";
import { IResponse } from "../interfaces/IResponse";
import { IProduct } from "../interfaces/iproduct";
@Injectable()

export class ProductProvider {
  private urlBase = environment.urlBase;

  constructor(private http: HttpClient) {
  }

  getlistProduct(): IProduct[] {
    const productos: IProduct[] =  [
      {
        codigo: '001',
        nombre: 'martillo',
        precioUnitario: 30.00,
        cantidad: 2
      },
      {
        codigo: '002',
        nombre: 'pala',
        precioUnitario: 40.00,
        cantidad: 2
      },
      {
        codigo: '003',
        nombre: 'destornillador',
        precioUnitario: 50.00,
        cantidad: 3
      },
      {
        codigo: '004',
        nombre: 'pegamento',
        precioUnitario: 20.00,
        cantidad: 5
      }
    ]

    return productos;
  }
}