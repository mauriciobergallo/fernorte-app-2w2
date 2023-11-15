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
  listOrdersFiltered:PurchaseOrderBack[] = [];

  page = 1;
  pageSize = 2;

  constructor(private servicePurchase:PurchaseOrderServiceService){

  }

  ngOnInit(): void {
    this.listOrders = this.servicePurchase.GetListMockPurchase();
    this.listOrdersFiltered = [...this.listOrders];
  }

  filterPurchaseOrder(value: string) {
    this.listOrdersFiltered = this.listOrders.filter((purchaseOrder) =>
      purchaseOrder.supplierName.toLowerCase().includes(value.toLowerCase()) ||
      purchaseOrder.employeeName.toLowerCase().includes(value.toLowerCase()) ||
      purchaseOrder.observation.toLowerCase().includes(value.toLowerCase()) ||
      purchaseOrder.purchaseStatus.toLowerCase().includes(value.toLowerCase()) ||
      purchaseOrder.total.toString().includes(value)
    );
  }

  onPageChange(page: number) {
    this.page = page;
  }
}
