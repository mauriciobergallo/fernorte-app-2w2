import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../enviroment/environment";
import { SaleOrderModel } from "../../models/SaleOrderModel";
import { IResponse } from "../../interfaces/IResponse";
import { ProductModel } from "../../models/ProductModel";
@Injectable()

export class ProductProvider {
  private urlProductBase = environment.urlProductBase;

  constructor(private http: HttpClient) {
  }

    getlistProduct(): Observable<ProductModel[]> {
      const url = this.urlProductBase + `/products/all`;
      return this.http.get<ProductModel[]>(url);
    }
  }