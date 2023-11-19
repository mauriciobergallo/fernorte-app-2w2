import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BillModel } from '../../models/BillingModelApi';
import { BillServiceService } from '../../services/billing/bill-service.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CaseConverterPipe } from '../../pipes/case-converter.pipe';
import { MockService } from '../../services/mocks/mock.service';

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

idBill:string="";
doc:string="";
fromDate:string="";
toDate:string="";
filters: Map<string, string> = new Map();


private subscriptions = new Subscription();

constructor(private billingService: BillServiceService, private caseConverter: CaseConverterPipe, 
  private mockService: MockService) {
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

onShowDetails(){

}

onPrint(){

}}
