import { Component, OnInit } from '@angular/core';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { ISupplierProduct } from 'src/app/modules/purchase/models/ISuppliers';

@Component({
  selector: 'fn-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit{
  cardProducts: ISupplierProduct[] = [];
  total: number = 0;

  constructor(private purchaseOrderService: PurchaseOrderServiceService) {}

  ngOnInit (): void {
    this.purchaseOrderService.getCardProductList2().subscribe((prod: ISupplierProduct[]) => {
      this.cardProducts = prod;
      this.calculateTotal();
    });
  }

  removeItem(product: ISupplierProduct): void {
    const index = this.cardProducts.indexOf(product);
    if (index !== -1) {
      this.cardProducts.splice(index, 1);
      // Update the service's cardProductList
      this.purchaseOrderService.setCardProductList2(this.cardProducts);
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = this.cardProducts?.map(prod => prod.price*prod.quantity).reduce((a, b) => a+b, 0);
  }

  onSubmit() {
    this.purchaseOrderService.setPurchaseOrderFlow();
  }
}
