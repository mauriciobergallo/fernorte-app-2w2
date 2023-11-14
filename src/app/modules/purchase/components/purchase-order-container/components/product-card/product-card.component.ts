import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  IProduct2,
  ISupplierProduct,
} from 'src/app/modules/purchase/models/ISuppliers';
import { PurchaseOrderServiceService } from '../../../purchase-order-container/services/purchase-order-service.service';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { NgModel } from '@angular/forms';
import { ProductsService } from '../../../supplier/services/products.service';

@Component({
  selector: 'fn-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  constructor(
    private _purchaseOrderSer: PurchaseOrderServiceService,
    private _productService: ProductsService
  ) {}
  quantity: number = 0;
  productQuantities: { [productId: number]: number } = {};
  idSupplier: number = 0;

  product_List: IProduct2[] = [{
    id: 1,
    name: "Taladro",
    price: 250,
    active: true
  },
  {
    id: 2,
    name: "Taladro",
    price: 250,
    active: true
  },
  {
    id: 3,
    name: "Taladro",
    price: 250,
    active: true
  },
  {
    id: 4,
    name: "Taladro",
    price: 250,
    active: true
  },
  {
    id: 1,
    name: "Taladro",
    price: 250,
    active: true
  }];

  cartProducts: ISupplierProduct[] = [];
  isButtonDisabled: { [productId: number]: boolean } = {};
  mostrarToastAddProduct: { [producId: number]: boolean } = {};

  suscription = new Subscription();

  ngOnInit(): void {
    this._purchaseOrderSer.getIdSupplier().subscribe((id) => {
      this.idSupplier = id;
      this.getProductsBySupplier(this.idSupplier);
    });
    this._purchaseOrderSer.getListProductSelected().subscribe((data) => {
      this.putListCart();
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
            console.log('DATA->', data) // data.products
            if (data && Array.isArray(data)) {
              this.product_List = data;
              //this.productQuantities = {};
              this.product_List.forEach((product) => {
                this.productQuantities[product.id] = 0;
                this.isButtonDisabled[product.id] = false;
              });
            }
          },
          error: (error: any) => console.log(error)
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
    if (!this.productQuantities[product.id]) {
      this.productQuantities[product.id] = 0;
    }
    this.productQuantities[product.id]--;
  }

  addToCart(product: IProduct2) {
    const quantity = this.productQuantities[product.id];
    if (quantity > 0) {
      const productSupplier: ISupplierProduct = {
        idSupplier: this.idSupplier,
        idProduct: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      };
      this.cartProducts.push(productSupplier)
      this._purchaseOrderSer.setCardProductList2(this.cartProducts);
      this.isButtonDisabled[product.id] = true;
      console.log('PROD->', this._purchaseOrderSer.getCardProductList());
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

  putListCart() {
    this.suscription.add(
      this._purchaseOrderSer.getListProductSelected().subscribe({
        next: (data: ISupplierProduct[]) => {
          this.cartProducts = data;
          this.product_List.forEach((product) => {
            const isProductInCart = this.isProductInCart(product);
            this.isButtonDisabled[product.id] = isProductInCart;
          });
        },
        error: (error: any) => console.log(error)
      })
    );
  }

  isProductInCart(product: IProduct2): boolean {
    return this.cartProducts.some((item) => item.idProduct === product.id);
  }
}
