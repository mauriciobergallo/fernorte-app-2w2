import { Component, Input } from '@angular/core';
import { IProduct, IProduct2, ISupliers } from '../../../models/ISuppliers';
import { ProductsService } from '../../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-products-supplier',
  templateUrl: './products-supplier.component.html',
  styleUrls: ['./products-supplier.component.css'],
})
export class ProductsSupplierComponent {
  @Input() supplier: ISupliers = {} as ISupliers;

  allProducts: IProduct[] = [];
  products: IProduct2[] = [];

  isOpenAddProduct: boolean = false;
  toastRemovedProduct: boolean = false;
  toastAddedProduct: boolean = false;

  product = {
    id: 0,
    precio: '',
    observations: '',
  };

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
    this._productsService.getProductsBySupplier(this.supplier.id).subscribe({
      next: (data: any) => {
        this.products = data.products;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  isProductInBothLists(product: IProduct): boolean {
    return (
      this.allProducts.some((item) => item.id === product.id) &&
      this.products.some((item) => item.id === product.id)
    );
  }

  openAddProduct(id: number) {
    this.isOpenAddProduct = true;
    this.product.id = id;
  }

  deleteProductBtn(id: number) {
    this.product.id = id;
    this.deleteProduct();
  }
  closeAddProducts() {
    this.isOpenAddProduct = false;
  }

  getProductPrice(productId: number): number {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.price : 0; // Default to 0 if not found.
  }

  addSupplier() {
    this._productsService
      .addProduct(
        this.supplier.id,
        this.product.id,
        parseInt(this.product.precio),
        this.product.observations
      )
      .subscribe({
        next: (data: ISupliers) => {
          this.product.precio = '';
          this.product.observations = '';
          this.closeAddProducts();
          this.ngOnInit();
          this.toastAddedProduct = true;
        },
        error: (error) => console.log(error),
      });
  }

  deleteProduct() {
    this._productsService
      .deleteProduct(this.supplier.id, this.product.id)
      .subscribe({
        next: (data: any) => {
          this.closeAddProducts();
          this.ngOnInit();
          this.toastRemovedProduct = true;
        },
        error: (error) => console.log(error),
      });
  }
}
