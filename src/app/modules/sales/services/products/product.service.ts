import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../enviroment/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private listProduct: ProductModel[] = [];
  private URL = environment.urlProductBase;

  constructor(private http: HttpClient) {}  

  getListProduct(): Observable<ProductModel[]> {
    const url = this.URL + `/products?page=0&size=10&sortBy=name&sortDir=desc&isDeleted=false`;
    return this.http.get<ProductModel[]>(url).pipe(
      map((res: any) => {
        return this.listProduct = res.products.map((product: { id_product: any; name: any; description: any; unit_price: any; stock_quantity: any; unit_of_measure: any; category: { id_category: any; name: any; description: any; }; is_deleted: any; url_image: any; price_product: any; discount: any; }) => {
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
              description: product.category.description || "",
              isDeleted:product.is_deleted
            },
            urlImage: product.url_image || "",
            priceProduct: product.price_product || 0,
            discount: product.discount || 0,
            isDeleted:product.is_deleted,
            cantidadSeleccionado: 0
          };
        });
      })
    );
  }

  restarCantidad(productoSeleccionado: ProductModel) {
    this.listProduct = this.listProduct.map(x => {
      if (x.idProduct == productoSeleccionado.idProduct)
        x.stockQuantity = x.stockQuantity - productoSeleccionado.cantidadSeleccionado!

      return x;
    })
    return this.listProduct;
  }

  filtrarProductos(texto: string) {
    if (texto !== '') {
      return this.listProduct.filter(producto => producto.name.toLowerCase().includes(texto.toLowerCase()));
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
        description: "",
        isDeleted:false
      },
      urlImage: "",
      priceProduct: 0,
      isDeleted:false,
      discount: 0,
      cantidadSeleccionado: 1
    }
    return productoSeleccionado;
  }

}
