import { Injectable } from '@angular/core';
import { IProductCategory } from '../models/IProductCategory';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { RequestResponseService } from './requestResponse.service';
import { IProduct } from '../models/IProduct';
import { HttpParams } from '@angular/common/http';
import { PriceHistory } from '../models/priceHistory';

@Injectable({
   providedIn: 'root',
})
export class ProductService {
   private products: string = `${environment.production}products`;
   private categories: string = `${environment.production}products/categories`;
   private priceHistory: string = `${environment.production}product-prices/`;
   constructor(private requestResponseService: RequestResponseService) { }

   get(
      page?: number | null,
      size?: number | null,
      sortBy?: string,
      sortDir?: string,
      isDeleted?: boolean,
      name?: string,
      idCategory?: number
   ): Observable<{ products: IProductCategory[]; totalItems: number; }> {
      let params = new HttpParams();
      if (page) {
         params = params.set('page', (page - 1).toString());
      }

      if (size) {
         params = params.set('size', size.toString());
      }

      if (sortBy) {
         params = params.set('sortBy', sortBy);
      }

      if (sortDir) {
         params = params.set('sortDir', sortDir);
      }

      if (isDeleted !== undefined) {
         params = params.set('isDeleted', isDeleted.toString());
      }
      if (name) {
         params = params.set('name', name);
      }
      if (idCategory) {
         params = params.set('idCategory', idCategory.toString());
      }

      return this.requestResponseService.makeGetRequest<{ products: IProductCategory[]; totalItems: number; }>
         (this.products, { params: params })
         .pipe(
            map((response: any) => {
               const products = response.products;
               return {
                  products: products.map((product: any) => ({
                     idProduct: product.id_product,
                     name: product.name,
                     description: product.description,
                     unitPrice: product.unit_price,
                     stockQuantity: product.stock_quantity,
                     unitOfMeasure: product.unit_of_measure,
                     category: {
                        idCategory: product.category.id_category,
                        name: product.category.name,
                        description: product.category.description,
                     },
                     urlImage: product.url_image,
                     userCreated: product.user_created,
                     priceProduct: product.price_product,
                     discount: product.discount,
                     isDeleted: product.is_deleted
                  })),
                  totalItems: response.length
               };
            }),
         );
   }

   getById(id: number): Observable<IProductCategory> {
      return this.requestResponseService.makeGetRequest<IProduct>(
         `${this.products}/${id}`
      );
   }
   getProductsByCategory(id: number): Observable<IProductCategory[]> {
      return this.requestResponseService.makeGetRequest<IProductCategory[]>(
         `${this.categories}/${id}`
      );
   }
   put(product: IProduct): Observable<IProduct> {
      const productApi = {
         id_product: product.idProduct,
         name: product.name,
         description: product.description,
         unit_price: product.unitPrice,
         stock_quantity: product.stockQuantity,
         unit_of_measure: product.unitOfMeasure,
         image: product.image,
         user_created: product.userCreated,
         id_category: product.idCategory,
      }
      return this.requestResponseService.makePutRequest<IProduct>(
         this.products,
         productApi
      );
   }
   
   delete(id: number, username: string): Observable<any> {
      return this.requestResponseService.makeDeleteRequest<any>(
         this.products + '/' + id + '?username=' + username
      );
   }

   getPriceHistoryAll() {
      return this.requestResponseService.makeGetRequest<PriceHistory>(`${this.priceHistory}product`);
   }

   getPriceHistory(
      page?: number,
      size?: number,
      sortBy?: string,
      sortDir?: string,
      idProduct?: number,
      initStartDate?: Date,
      finalStartDate?: Date,
   ): Observable<{ priceHistory: PriceHistory[], totalItems: number }> {
      let params = new HttpParams();
      if (page) params = params.append('page', (page - 1).toString());
      if (size) params = params.append('size', size.toString());
      if (sortBy) params = params.append('sortBy', sortBy);
      if (sortDir) params = params.append('sortDir', sortDir);
      if (idProduct) params = params.append('idProduct', idProduct.toString());
      if (initStartDate) params = params.append('initStartDate', new Date(initStartDate).toISOString().slice(0, -1));
      if (finalStartDate) params = params.append('finalEndDate', new Date(finalStartDate).toISOString().slice(0, -1));
      return this.requestResponseService.makeGetRequest<{ products: PriceHistory[]; totalItems: number; }>
         (`${this.priceHistory}product`, { params: params })
         .pipe(
            map((response: any) => ({
               priceHistory: response.productsPrices.map((item: any) => ({
                  name: item.product.name,
                  unitPrice: item.unit_price,
                  endDate: item.end_date,
                  startDate: item.start_date,
                  idProduct: item.product.id_product
               })),
               totalItems: response.length
            })),
         );
   }
}


