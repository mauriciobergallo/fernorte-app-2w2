import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PaymentOrderDetailResponse, PaymentOrderResponse } from 'src/app/modules/purchase/models/IPaymentOrder';
import { PurchaseOrderResponse } from 'src/app/modules/purchase/models/IPurchaseOrder';
import { ReportsServiceService } from '../../service/reports-service.service';
import { SupliersService } from '../../../supplier/services/supliers.service';
import { ISupplier } from 'src/app/modules/purchase/models/ISuppliers';

@Component({
  selector: 'fn-orders-grid',
  templateUrl: './orders-grid.component.html',
  styleUrls: ['./orders-grid.component.css']
})
export class OrdersGridComponent implements OnInit{

  @Input() tab = new BehaviorSubject<string>("COMPRA");
  purchaseOrders!: Observable<PurchaseOrderResponse[]>;
  paymentOrders!:  Observable< PaymentOrderResponse[]>;
  paymentTotal!: number;
  suppliers: ISupplier[] = [{
    id: 1,
    socialReason: "Razon social 1",
    fantasyName: "Fantasia 1",
    cuit: "20323730009",
    adress: "Direccion 1",
    active: true,
  },
  {
    id: 2,
    socialReason: "Razon social 2",
    fantasyName: "Fantasia 2",
    cuit: "20323730009",
    adress: "Direccion 2",
    active: true,
  },
  {
    id: 3,
    socialReason: "Razon social 3",
    fantasyName: "Fantasia 3",
    cuit: "20323730009",
    adress: "Direccion 3",
    active: true,
  },
  {
    id: 4,
    socialReason: "Razon social 4",
    fantasyName: "Fantasia 4",
    cuit: "20323730009",
    adress: "Direccion 4",
    active: true,
  },
  {
    id: 5,
    socialReason: "Razon social 5",
    fantasyName: "Fantasia 5",
    cuit: "20323730009",
    adress: "Direccion 5",
    active: true,
  }]

  constructor(private reportsService: ReportsServiceService,
    private suppliersService: SupliersService){}

  ngOnInit (): void {
    this.tab.subscribe(newTabValue => {
      this.fillGrid();
    });
    // this.suppliersService.getSupliers().subscribe((suppliers: ISupplier[]) => this.suppliers = suppliers);
  }

  fillGrid(): void {
    if ( this.tab.getValue() === 'COMPRA') {
      this.reportsService.getFilteredPurchaseOrdersList().subscribe((purchaseOrders: PurchaseOrderResponse[]) => {
        this.purchaseOrders = of(purchaseOrders);
      })
    } else {
      this.reportsService.getFilteredPaymentOrdersList().subscribe((payments: PaymentOrderResponse[]) => {
        this.paymentOrders = of(payments)
      });
    }
  }

  setPaymentTotal(details: PaymentOrderDetailResponse[]) : number {
    const total = details.reduce((total: number, detail: PaymentOrderDetailResponse) => total + detail.amount, 0);
    return total;
  }

  setSupplierName(supplierId: number): string {
    const name = this.suppliers.filter(supplier => supplier.id === supplierId)[0].fantasyName;
    return name;
  }

}
