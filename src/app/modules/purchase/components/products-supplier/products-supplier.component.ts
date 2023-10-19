import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/ISuppliers';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'fn-products-supplier',
  templateUrl: './products-supplier.component.html',
  styleUrls: ['./products-supplier.component.css'],
})
export class ProductsSupplierComponent {
  @Input() supplierId: number = 0;
  allProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: (data: IProduct[]) => {
        this.allProducts = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
    this._productsService.getProductsBySupplier(this.supplierId).subscribe({
      next: (data: any) => {
        this.products = data.products;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  isProductInBothLists(product: IProduct): boolean {
    console.log(
      this.allProducts.some((item) => item.id === product.id) &&
        this.products.some((item) => item.id === product.id)
    );
    return (
      this.allProducts.some((item) => item.id === product.id) &&
      this.products.some((item) => item.id === product.id)
    );
  }
}
