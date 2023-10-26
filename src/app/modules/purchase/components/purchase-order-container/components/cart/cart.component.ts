import { Component } from '@angular/core';
import { CartProduct } from 'src/app/modules/purchase/models/CardProduct';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';

@Component({
  selector: 'fn-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cardProducts: CartProduct[] = [];

  constructor(private purchaseOrderService: PurchaseOrderServiceService) {
    this.cardProducts = this.purchaseOrderService.getCardProductList();
  }

  removeItem(product: CartProduct): void {
    const index = this.cardProducts.indexOf(product);
    if (index !== -1) {
      this.cardProducts.splice(index, 1);
      // Update the service's cardProductList
      this.purchaseOrderService.setCardProductList(this.cardProducts);
    }
  }

  logToConsole(): void {
    console.log('Button clicked. Logging to console.');
  }
}
