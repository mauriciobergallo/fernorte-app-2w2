import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BillModel } from '../../models/BillingModelApi';
import { BillServiceService } from '../../services/billing/bill-service.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CaseConverterPipe } from '../../pipes/case-converter.pipe';
import { MockService } from '../../services/mocks/mock.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { BillView } from '../../models/BillView';
import { PrintDocumentsService } from '../../services/print/print-documents-service';

@Component({
  selector: 'fn-billing-search-list',
  templateUrl: './billing-search-list.component.html',
  styleUrls: ['./billing-search-list.component.css']
})
export class BillingSearchListComponent implements OnInit, OnDestroy {
billList:BillModel[]=[];
bill!:BillView;
billList1:BillView[]=[];

billListMock:BillModel[]=[];

billFiltro1:BillModel[]=[];
currentPage: number = 1;

showPagination: boolean = true;

selectedBill:any;

idBill:string="";
doc:string="";
fromDate:string="";
toDate:string="";
filters: Map<string, string> = new Map();


private subscriptions = new Subscription();

constructor(private billingService: BillServiceService, private caseConverter: CaseConverterPipe, 
  private mockService: MockService, private modalService:NgbModal,
  private printService :PrintDocumentsService) {
}

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
ngOnInit(): void {
    //this.billListMock = this.mockService.getMocks();
   this.onLoadPage(1)
}


onSendFilters(){
  if(this.idBill != ""){
    this.billListMock = this.mockService.getFiltrada1();
    this.showPagination=false;
    this.idBill="";
  this.fromDate = "";
  this.toDate = ""
    return;
  
  }
  if(this.fromDate != ""){
    this.billListMock = this.mockService.getFiltrada2();
    this.showPagination = false; 
    this.idBill="";
    this.fromDate = "";
    this.toDate = "";
    return;
  }
  if(this.idBill === "" && this.fromDate ===""){
    this.onLoadPage(1);
    this.showPagination = true;
    this.idBill="";
    this.fromDate = "";
    this.toDate = "";
    return;
  } 

  //this.showPagination = false; 
  console.log(this.showPagination)
  
  
}

onShowDetails(item:any, content: any){
  this.selectedBill = item;
  console.log(this.selectedBill)
  this.openModal(content);
}

openModal(content: any) {
  this.modalService.open(content, { centered: true });
}

calculateTotal(bill: any): number {
  let total = 0;

  if (bill && bill.detail_bill) {
    for (const prod of bill.detail_bill) {
      total += prod.quantity * prod.unitary_price;
    }
  }

  return total;
}

onCloseDetails() {
  this.modalService.dismissAll();
}

onLoadPage(page : number) {
  if(page === 1) {
    this.billListMock = this.mockService.getMocks().slice(page-1,(page*5));
    this.currentPage = page;
  } else {
    this.currentPage = page;
    this.billListMock = this.mockService.getMocks().slice((page-1)*5,(page*5));
  }
}

onPrint(){//bill:BillView) {
   /*  this.bill = bill;
    alert("click on Print")
    this.printService.sendBill(this.bill);
  } */
}
}
