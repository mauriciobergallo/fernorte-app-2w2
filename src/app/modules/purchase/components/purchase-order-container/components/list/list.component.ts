import { Component, OnInit } from '@angular/core';

import { PurchaseOrderBack, PurchaseOrderResponse } from 'src/app/modules/purchase/models/IPurchaseOrder';
import { PurchaseOrderServiceService } from '../../services/purchase-order-service.service';
import { Observable, of } from 'rxjs';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { ISupplier } from 'src/app/modules/purchase/models/ISuppliers';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  purchaseOrdersList!: Observable<PurchaseOrderResponse[]>;
  listOrdersFiltered!: PurchaseOrderResponse[];
  suppliers: ISupplier[] = []
  collectionSize!: number;
  page: number = 1;
  pageSize: number = 4;

  constructor(private servicePurchase:PurchaseOrderServiceService,
    private suppliersService: SupliersService){}

  ngOnInit(): void {
    this.servicePurchase.getPurchaseOrders();
    this.suppliersService.getSupliers().subscribe((suppliers: ISupplier[]) => this.suppliers = suppliers);
    this.servicePurchase.getFilteredPurchaseOrdersList().subscribe((purchaseOrders: PurchaseOrderResponse[]) => {
      this.purchaseOrdersList = of(purchaseOrders);
    });
  }

  filterPurchaseOrder(value: string): void {
      this.purchaseOrdersList.subscribe(purchases => {
        this.collectionSize = purchases.length;

        const filterList = purchases.filter((purchaseOrder) =>
        this.setSupplierName(purchaseOrder.supplierId).toLowerCase().includes(value.toLowerCase()) ||
        this.setEmployeeName(purchaseOrder.employeeId).toLowerCase().includes(value.toLowerCase()) ||
        purchaseOrder.observation.toLowerCase().includes(value.toLowerCase()) ||
        purchaseOrder.purchaseStatus.toLowerCase().includes(value.toLowerCase()) ||
        purchaseOrder.total.toString().includes(value));

        this.listOrdersFiltered = filterList;
      })
  }

  onPageChange(page: number) {
    this.page = page;
  }

  setSupplierName(supplierId: number): string {
    const name = this.suppliers.filter(supplier => supplier.id === supplierId)[0].fantasyName;
    return name;
  }

  setEmployeeName(employeeId: number): string {
    const name = `Ignacio Gallo ${employeeId}`
    return name;
  }

  onDelete(orderId: number): void {
    let deleted: number = 0; 
    this.servicePurchase.deletePurchaseOrder(orderId).subscribe(res => deleted = res);
    if (deleted) {
      this.servicePurchase.getFilteredPurchaseOrdersList().subscribe((purchaseOrders: PurchaseOrderResponse[]) => {
        this.purchaseOrdersList = of(purchaseOrders);
      })
      Swal.fire({
        title: 'Éxito!', 
        text: "Order de compra eliminada!", 
        icon: 'success', 
        confirmButtonText: 'ok'
      })
    } else {
      Swal.fire({
        title: 'Error!', 
        text: "Hubo un error al eliminar la order", 
        icon: 'error', 
        confirmButtonText: 'ok'
      })
    }
  }
}
