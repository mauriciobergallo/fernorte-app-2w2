import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct2 } from 'src/app/modules/purchase/models/ISuppliers';
import { ProductsService } from 'src/app/modules/purchase/services/products.service';
import { PurchaseOrderServiceService } from '../../../purchase-order-container/services/purchase-order-service.service';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { NgModel } from '@angular/forms';
import { CartProduct } from 'src/app/modules/purchase/models/CardProduct';

@Component({
  selector: 'fn-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  constructor(
    private _purchaseOrderSer: PurchaseOrderServiceService,
    private _productService: ProductsService
  ) { }
  quantity: number = 0;
  productQuantities: { [productId: number]: number } = {};
  idSupplier: number = 0;
  product_List: IProduct2[] = [];
  cartProducts: CartProduct[] = [];
  isButtonDisabled: { [productId: number]: boolean } = {}; 
  mostrarToastAddProduct: {[producId: number]: boolean} = {}

  suscription = new Subscription();

  ngOnInit(): void {
    this._purchaseOrderSer.getIdSupplier().subscribe((id) => {
      this.idSupplier = id;
      this.getProductsBySupplier(this.idSupplier);
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
  getProductsBySupplier(id: number) {
    if (id != 0) {
      this.suscription.add(
        this._productService.getProductsBySupplier(id).subscribe({
          next: (data: any) => {
            if (data.products && Array.isArray(data.products)) {
              this.product_List = data.products;

              this.productQuantities = {};
              this.product_List.forEach((product) => {
                this.productQuantities[product.id] = 0;
                this.isButtonDisabled[product.id] = false;
              });
            }
          },
          error: (error: any) => {
            console.log(error);
          },
        })
      );
    }
  }

  Summ(product: IProduct2) {
    if (!this.productQuantities[product.id]) {
      this.productQuantities[product.id] = 0;
    }
    this.productQuantities[product.id]++;
  }

  Rest(product: IProduct2) {
    if (this.productQuantities[product.id] > 0) {
      this.productQuantities[product.id]--;
    }
  }

  addToCart(product: IProduct2) {
    const quantity = this.productQuantities[product.id];
    if (quantity > 0) {
      const cartProduct = {
        name: product.name,
        quantity: quantity,
        blocked: true,
      };
      this.cartProducts.push(cartProduct);
      this._purchaseOrderSer.setCardProductList(this.cartProducts);
      this.isButtonDisabled[product.id] = true;
      console.log(this._purchaseOrderSer.getCardProductList());
    } else {
      this.mostrarToastAddProduct[product.id] = true;
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const input = event.key;
    if (!/^[0-9]$/.test(input) && !event.ctrlKey) {
      event.preventDefault();
    }
  }

  getProductsCart(product: IProduct2) {
    const productList = this._purchaseOrderSer.getCardProductList();
    const isProductInCart = productList.some(item => item.name === product.name);
    if (isProductInCart) {
      this.isButtonDisabled[product.id] = true;
    }
    this.isButtonDisabled[product.id] = false;  
  }
}