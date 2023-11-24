import { Component } from '@angular/core';
import { PurchaseOrderServiceService } from './services/purchase-order-service.service';

@Component({
  selector: 'fn-purchase-order-container',
  templateUrl: './purchase-order-container.component.html',
  styleUrls: ['./purchase-order-container.component.css']
})
export class PurchaseOrderContainerComponent {

  constructor(private _purchaseOrderService: PurchaseOrderServiceService) {}

  purchaseOrderFlow: boolean = false;
  purchaseBookingFlow: boolean = false;
  purchaseHeaderFlow: boolean = true;
  purchaseProductCardFlow: boolean = true;
  purchaseCartFlow: boolean = true;
  purchasePreviewFlow: boolean = false;


  ngOnInit(){
    this._purchaseOrderService.getPurchaseOrderFlow().subscribe((flow) => { this.purchaseOrderFlow = flow } )
    this._purchaseOrderService.getPurchaseBookingFlow().subscribe((flow) => { this.purchaseBookingFlow = flow } )
    this._purchaseOrderService.getPurchaseHeaderFlow().subscribe((flow) => { this.purchaseHeaderFlow = flow } )
    this._purchaseOrderService.getPurchaseProductCardFlow().subscribe((flow) => { this.purchaseProductCardFlow = flow } )
    this._purchaseOrderService.getPurchaseCartFlow().subscribe((flow) => { this.purchaseCartFlow = flow } )
    this._purchaseOrderService.getPurchasePreviewFlow().subscribe((flow) => { this.purchasePreviewFlow = flow } )
  }

}
