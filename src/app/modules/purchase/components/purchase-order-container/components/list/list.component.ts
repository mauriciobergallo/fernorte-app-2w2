import { Component, OnInit } from '@angular/core';

import { PurchaseOrderBack } from 'src/app/modules/purchase/models/IPurchaseOrder';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';

@Component({
  selector: 'fn-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listOrders:PurchaseOrderBack[] = [];

  constructor(private servicePurchase:PurchaseOrderServiceService){

  }

  ngOnInit(): void {
    this.listOrders = this.servicePurchase.GetListMockPurchase();
  }

}
