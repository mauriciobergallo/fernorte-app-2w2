import { Component, OnInit, OnDestroy } from '@angular/core';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';
import { SaleOrderView } from '../../models/SaleOrderView';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintDocumentsService } from '../../services/print/print-documents-service';
import { PdfInstance } from 'jspdf-html2canvas/dist/types';
import { Subscription } from 'rxjs';
import { SaleOrderOk } from '../../models/SaleOrderOk';


@Component({
  selector: 'fn-sale-order-view',
  templateUrl: './sale-order-view.component.html',
  styleUrls: ['./sale-order-view.component.css']
})
export class SaleOrderViewComponent implements OnInit, OnDestroy {
  listSaleOrder!: SaleOrderView;
  saleOrder!: any;
  subscription!: Subscription;

  subtotal: number = 0;
  iva: number = 0;
  saleOrderId: number = 0;
  type: String = "Order"
  constructor(private saleOrderService: SaleOrderServiceService, private activatedRoute: ActivatedRoute,
    private router: Router, private printService: PrintDocumentsService) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.printService.clear();
  }

  ngOnInit(): void {

    this.subscription = this.printService.getSaleOrder$.subscribe((saleOrder) => {
      this.saleOrder = saleOrder;
    });

    if (this.saleOrder.idSaleOrder == undefined) {
      this.calculateSubBill();
      this.calculateIvaBill();
      this.type = "Sale"
      return
    }

    this.calculateSub();
    this.calculateIva();

  }
  calculateSubBill() {
    this.saleOrder.detail_bill.forEach((detail: any) => {
      this.subtotal += detail.quantity * detail.unitary_price;
    })
  }
  calculateIvaBill() {
    this.iva = this.subtotal * 0.21;
  }


  calculateSub() {
    this.saleOrder.details.forEach((detail: any) => {
      this.subtotal += detail.quantity * detail.price;
    })

  }
  calculateIva() {
    this.iva = this.subtotal * 0.21;
  }
}

