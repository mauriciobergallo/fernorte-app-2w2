import { Component, OnDestroy, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';
import { Observable, Subscription } from 'rxjs';
import { SaleOrderOk } from '../../models/SaleOrderOk';
import { SaleOrderApi } from '../../models/SaleModelApi';
import { ProductApi } from '../../models/ProductApi';
import { ProductOk } from '../../models/ProductOk';
import { NgModel, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MockSalesService } from '../../services/salesOrder/mock-sales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleOrderView } from '../../models/SaleOrderView';
import { PrintDocumentsService } from '../../services/print/print-documents-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-sale-order-search-list',
  templateUrl: './sale-order-search-list.component.html',
  styleUrls: ['./sale-order-search-list.component.css']
})
export class SaleOrderSearchListComponent implements OnInit, OnDestroy {
  saleOrdersList: SaleOrderApi[] = [];
  saleOrdersListOk: SaleOrderOk[] = [];

  saleOrderStates: string[] = [];
  saleOrderOk!: SaleOrderOk;
  salePick: boolean = false;

  currentPage: number = 1;

  showPagination: boolean = true;

  selectedOrder: any;


  idOrder: string = "";
  doc: string = "";
  fromDate: string = "";
  toDate: string = "";
  stateOrder: string = "";
  filters: Map<string, string> = new Map();

  pageQuantity: number = 0;

  private subscriptions = new Subscription();

  constructor(private saleOrderServiceService: SaleOrderServiceService,
    private mockService: MockSalesService, private modalService: NgbModal,
    private print: PrintDocumentsService, private route: Router) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    this.onLoadPage(1);
  }

  onSendFilters(form: NgForm) {
    if (this.doc !== "") {
      this.saleOrdersListOk = this.mockService.onShowByDoc();
      this.doc = "";
      this.stateOrder = "";
      this.showPagination = false;
      return;

    } else if (this.stateOrder !== "") {
      this.saleOrdersListOk = this.mockService.onShowByState();
      this.doc = "";
      this.stateOrder = "";
      this.showPagination = false;
      return;
    } else {
      this.onLoadPage(1);
      this.showPagination = true;
      this.doc = "";
      this.stateOrder = "";
      return;
    }
  }

  onShowDetails(item: any, content: any) {
    this.selectedOrder = item;
    console.log(this.selectedOrder)
    this.openModal(content);
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onCloseDetails() {
    this.modalService.dismissAll();
  }

  calculateTotal(saleOrder: any): number {
    let total = 0;

    if (saleOrder && saleOrder.details) {
      for (const prod of saleOrder.details) {
        total += prod.quantity * prod.price;
      }
    }

    return total;
  }

  onCalculatePages(list: SaleOrderOk[]) {
    this.pageQuantity = list.length / 10;
  }

  onLoadPage(page: number) {
    if (page === 1) {
      this.saleOrdersListOk = this.mockService.onShowList().slice(page - 1, (page * 10));
      this.currentPage = page;
    } else {
      this.saleOrdersListOk = this.mockService.onShowList().slice((page - 1) * 10, (page * 10));
      this.currentPage = page;
    }
  }


  onPrint(saleOrder: SaleOrderOk) {
    this.saleOrderOk = saleOrder;
    Swal.fire({
      title: 'Imprimir',
      text: '¿Estás seguro de que deseas imprimir?',
      icon: 'info', // Puedes cambiar 'info' por el icono que desees, por ejemplo, 'printer'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#808080',
      confirmButtonText: 'Imprimir',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para imprimir
        this.print.sendOrder(this.saleOrderOk);
        this.route.navigateByUrl('printOrder')
      }
    });

  }
}
