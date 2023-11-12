import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "../../enviroment/environment";
import { ProductModel } from "../../models/ProductModel";
@Injectable()

export class ProductProvider {
  private urlProductBase = environment.urlProductBase;

  constructor(private http: HttpClient) {
  }

  getListProduct(): Observable<ProductModel[]> {
    const url = this.urlProductBase + `/products`;
    return this.http.get<ProductModel[]>(url).pipe(
      map((products: any[]) => {
        return products.map(product => {
          return {
            idProduct: product.id_product,
            name: product.name,
            description: product.description || "",
            unitPrice: product.unit_price || 0,
            stockQuantity: product.stock_quantity || 0,
            unitOfMeasure: product.unit_of_measure || "",
            category: {
              idCategory: product.category.id_category,
              name: product.category.name,
              description: product.category.description || ""
            },
            urlImage: product.url_image || "",
            priceProduct: product.price_product || 0,
            discount: product.discount || 0,
            cantidadSeleccionado: 0
          };
        });
      })
    );
  }
}