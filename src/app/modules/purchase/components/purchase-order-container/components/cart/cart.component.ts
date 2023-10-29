import { Component } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { ISupplierProduct } from 'src/app/modules/purchase/models/ISuppliers';

@Component({
  selector: 'fn-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cardProducts: ISupplierProduct[] = [];

  constructor(private purchaseOrderService: PurchaseOrderServiceService) {
    this.cardProducts = this.purchaseOrderService.getCardProductList();
  }

  removeItem(product: ISupplierProduct): void {
    const index = this.cardProducts.indexOf(product);
    if (index !== -1) {
      this.cardProducts.splice(index, 1);
      // Update the service's cardProductList
      this.purchaseOrderService.setCardProductList2(this.cardProducts);
    }
  }

  logToConsole(): void {
    console.log('Button clicked. Logging to console.');
  }
}
