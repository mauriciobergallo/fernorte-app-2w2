import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BillModel } from '../../models/BillingModelApi';
import { BillServiceService } from '../../services/billing/bill-service.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CaseConverterPipe } from '../../pipes/case-converter.pipe';
import { MockService } from '../../services/mocks/mock.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-billing-search-list',
  templateUrl: './billing-search-list.component.html',
  styleUrls: ['./billing-search-list.component.css']
})
export class BillingSearchListComponent implements OnInit, OnDestroy {
billList:BillModel[]=[];
counter:number=0;
billListMock:BillModel[]=[];

billFiltro1:BillModel[]=[];

selectedBill:any;

idBill:string="";
doc:string="";
fromDate:string="";
toDate:string="";
filters: Map<string, string> = new Map();


private subscriptions = new Subscription();

constructor(private billingService: BillServiceService, private caseConverter: CaseConverterPipe, 
  private mockService: MockService, private modalService:NgbModal) {
}
openModal(content: any) {
  this.modalService.open(content, { centered: true });
}

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
ngOnInit(): void {
    //this.billListMock = this.mockService.getMocks();
}

onSendFilters(){
  console.log(this.counter)
  if(this.idBill != ""){
    this.billListMock = this.mockService.getFiltrada1();
    this.counter++;
    
  }
  if(this.fromDate != ""){
    this.billListMock = this.mockService.getFiltrada2();
    this.counter++;
  }
  if(this.idBill === "" && this.fromDate ===""){
    this.billListMock = this.mockService.getMocks();
    this.counter++;
  }  
  this.idBill="";
  this.fromDate = "";
  this.toDate = ""
}

onShowDetails(item:any, content: any){
  this.selectedBill = item;
  console.log(this.selectedBill)
  this.openModal(content);
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
onPrint(){

}}
