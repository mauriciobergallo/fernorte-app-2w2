import { Component } from '@angular/core';
import { ISupplierAndProduct } from 'src/app/modules/purchase/models/ISuppliers';
import { ProductsService } from '../../../supplier/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-see-diferent-price',
  templateUrl: './see-diferent-price.component.html',
  styleUrls: ['./see-diferent-price.component.css']
})
export class SeeDiferentPriceComponent {
  searchText: string = "";

  listAll:ISupplierAndProduct[]=[];

  constructor(private _productsService: ProductsService,
              private routes:Router ) {}

  ngOnInit(): void {
    this._productsService.getProductsAndSupplier().subscribe({
      next: (data: ISupplierAndProduct[]) => {
        this.listAll = data.sort((a, b) => a.price - b.price);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  
  enviar(){
    this.routes.navigate(['/purchase-order']);
  }
  comprarProducto(productName: string) {
    this.routes.navigate(['/purchase-order', productName]);
  }
}
