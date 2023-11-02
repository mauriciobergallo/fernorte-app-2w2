import { Component } from '@angular/core';
import { PurchaseOrderServiceService } from './services/purchase-order-service.service';

@Component({
  selector: 'fn-purchase-order-container',
  templateUrl: './purchase-order-container.component.html',
  styleUrls: ['./purchase-order-container.component.css']
})
export class PurchaseOrderContainerComponent {

  constructor(private _purchaseOrderService: PurchaseOrderServiceService) {}

  purchaseOrderFlow: boolean = true;

  ngOnInit(){
    this._purchaseOrderService.getPurchaseOrderFlow().subscribe((flow) => { this.purchaseOrderFlow = flow } )
  }

}
