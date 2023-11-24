import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReportsServiceService } from '../../service/reports-service.service';
import { PurchaseOrderResponse } from 'src/app/modules/purchase/models/IPurchaseOrder';
import { PaymentOrderDetailResponse, PaymentOrderResponse } from 'src/app/modules/purchase/models/IPaymentOrder';
import Swal from 'sweetalert2';
import { ISupplier } from 'src/app/modules/purchase/models/ISuppliers';
import { SupliersService } from '../../../supplier/services/supliers.service';

import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'fn-reports-screen',
  templateUrl: './reports-screen.component.html',
  styleUrls: ['./reports-screen.component.css']
})
export class ReportsScreenComponent implements OnInit{

  activeTab$ = new BehaviorSubject<string>("COMPRA");
  suppliers: ISupplier[] = []
  constructor(private reportsService: ReportsServiceService, 
    private suppliersService: SupliersService) { }

  ngOnInit(): void {
    this.fillLists();
  }

  tab(tab: string): void {
    this.activeTab$.next(tab);
  }

  fillLists(): void {
    this.reportsService.getPurchaseOrders();
    this.reportsService.getPaymentOrders();
    this.suppliersService.getSupliers().subscribe((suppliers: ISupplier[]) => this.suppliers = suppliers);
  }
 

  downloadPDF(): void {
    /* Swal.fire({
      title: 'Success!', 
      text: "Falta instalar la dependencia en el proyecto", 
      icon: 'success', 
      confirmButtonText: 'ok'
    })
    return; */
    
    let dataTable = [];
    const pdf = new jsPDF() as any;
    const headers = ['Proveedor', 'Total', 'Fecha', 'Observación', 'Status'];
    let rows = [];
    if (this.activeTab$.getValue() === 'COMPRA'){
      dataTable = this.fillPurchaseDataTable();
      rows = dataTable.map((order: PurchaseOrderResponse) => {
        return [
          this.setSupplierName( order.supplierId),
          order.total,
          order.date,
          order.observation,
          order.purchaseStatus,
        ]
      });
    } else {
      dataTable = this.fillPaymentDataTable();
      rows = dataTable.map((order: PaymentOrderResponse) => {
        return [
          this.setSupplierName( order.supplierId),
          this.setPaymentTotal(order.paymentDetails),
          order.date,
          order.observation,
          order.paymentState,
        ]
      });
    }
    pdf.text(`Reporte de Compras: ${'ordenes de compra'}`, 10, 10);
    pdf.autoTable({
      startY: 20,
      head: [headers],
      body: rows,
    }); 
    pdf.save('reporte_compras.pdf');
  }

  fillPurchaseDataTable(): PurchaseOrderResponse[] {
    let dataTable!: PurchaseOrderResponse[];
    if (this.activeTab$.getValue() === 'COMPRA') {
      this.reportsService.getFilteredPurchaseOrdersList().subscribe((purchases: PurchaseOrderResponse[]) => dataTable = purchases)
    } 
    return dataTable;
  }

  fillPaymentDataTable(): PaymentOrderResponse[] {
    let dataTable!: PaymentOrderResponse[];
    if (this.activeTab$.getValue() === 'PAGO') {
    this.reportsService.getFilteredPaymentOrdersList().subscribe((payment: PaymentOrderResponse[]) => dataTable = payment)
    } 
    return dataTable;
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
