import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IProduct2,
  IPurchaseDetailRequestDTON,
  IPurchaseOrderRequestDTON,
  ISupplierProduct,
  Product,
} from 'src/app/modules/purchase/models/ISuppliers';
import { PurchaseOrderServiceService } from '../../../purchase-order-container/services/purchase-order-service.service';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { NgModel } from '@angular/forms';
import { ProductsService } from '../../../supplier/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  constructor(
    private purchaseOrderService: PurchaseOrderServiceService,
    private _productService: ProductsService
  ) {}
  // newQuantity: number = 0;
  // quantity: number = 0;
  purchaseOrderRequest: IPurchaseOrderRequestDTON = {} as IPurchaseOrderRequestDTON;
  productQuantities: { [productId: number]: number } = {};
  idSupplier: number = 0;

  product_List: Product[] = [];

  cartProducts: ISupplierProduct[] = [];
  isButtonDisabled: { [productId: number]: boolean } = {};
  mostrarToastAddProduct: { [producId: number]: boolean } = {};

  suscription = new Subscription();

  ngOnInit(): void {
    this.purchaseOrderService.purchaseOrderRequest.subscribe({
      next: val => {
        this.purchaseOrderRequest = val
      }
    });
    this.purchaseOrderService.getIdSupplier().subscribe((id) => {
      this.idSupplier = id;
      this.getProductsBySupplier(this.idSupplier);
    });
    this.purchaseOrderService.getListProductSelected().subscribe((data) => {
      this.putListCart();
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  getProductsBySupplier(id: number): void {
    if (id != 0) {
      this.suscription.add(
        this._productService.getProductsBySupplier1(id).subscribe({
          next: (data: any) => {
            console.log('PRODUCTS->', data); // data.products
            if (data && Array.isArray(data)) {
              this.product_List = data;
              //this.productQuantities = {};
              this.product_List.forEach((product) => {
                this.productQuantities[product.id_product] = 0;
                this.isButtonDisabled[product.id_product] = false;
              });
            }
          },
          error: (error: any) => console.log(error),
        })
      );
    }
  }

  Summ(product: Product) {
    if (!this.productQuantities[product.id_product]) {
      this.productQuantities[product.id_product] = 0;
    }
    this.productQuantities[product.id_product]++;
  }

  Rest(product: Product) {
    if (!this.productQuantities[product.id_product]) {
      this.productQuantities[product.id_product] = 0;
    }
    this.productQuantities[product.id_product]--;
  }

  addToCart(product: Product) {
    const quantity = this.productQuantities[product.id_product];
    if (quantity > 0) {
      const productSupplier: ISupplierProduct = {
        idSupplier: this.idSupplier,
        idProduct: product.id_product,
        name: product.name,
        price: product.price,
        quantity: quantity,
      };
      this.cartProducts.push(productSupplier);
      this.purchaseOrderService.setCardProductList2(this.cartProducts);
      this.isButtonDisabled[product.id_product] = true;
      console.log('PROD->', this.purchaseOrderService.getCardProductList());
    } else {
      this.mostrarToastAddProduct[product.id_product] = true;
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const input = event.key;
    if (!/^[0-9]$/.test(input) && !event.ctrlKey) {
      event.preventDefault();
    }
  }

  putListCart() {
    this.suscription.add(
      this.purchaseOrderService.getListProductSelected().subscribe({
        next: (data: ISupplierProduct[]) => {
          this.cartProducts = data;
          this.product_List.forEach((product) => {
            const isProductInCart = this.isProductInCart(product);
            this.isButtonDisabled[product.id_product] = isProductInCart;
          });
        },
        error: (error: any) => console.log(error),
      })
    );
  }

  isProductInCart(product: Product): boolean {
    return this.cartProducts.some(
      (item) => item.idProduct === product.id_product
    );
  }
}
