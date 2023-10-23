import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../enviroment/environment";
import { SaleOrderModel } from "../models/SaleOrderModel";
import { IResponse } from "../interfaces/IResponse";
import { ProductModel } from "../models/ProductModel";
@Injectable()

export class ProductProvider {
  private urlBase = environment.urlBase;

  constructor(private http: HttpClient) {
  }

  getlistProduct(): ProductModel[] {
    const productos: ProductModel[] =  [
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