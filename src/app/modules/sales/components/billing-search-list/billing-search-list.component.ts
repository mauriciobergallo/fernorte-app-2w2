import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BillOk } from '../../models/BillingOk';
import { BillModel } from '../../models/BillingModelApi';
import { ProductApi } from '../../models/ProductApi';
import { ProductOk } from '../../models/ProductOk';
import { BillServiceService } from '../../services/billing/bill-service.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CaseConverterPipe } from '../../pipes/case-converter.pipe';

@Component({
  selector: 'fn-billing-search-list',
  templateUrl: './billing-search-list.component.html',
  styleUrls: ['./billing-search-list.component.css']
})
export class BillingSearchListComponent implements OnInit, OnDestroy {
billList:BillModel[]=[];

idBill:string="";
doc:string="";
fromDate:string="";
toDate:string="";
filters: Map<string, string> = new Map();

private subscriptions = new Subscription();

constructor(private billingService: BillServiceService, private caseConverter: CaseConverterPipe) {
}



ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
ngOnInit(): void {
    this.billingService.getBills().subscribe(
      (response)=>{
        let toCamel:BillModel[] = this.caseConverter.toCamelCase(response);
        console.log(response);
        console.log(this.billList)
        this.billList=response;       
        //response.forEach(x => this.billList.push(x))
      }
    )
}

onSendFilters(form: NgForm){
  if(form.valid){
    this.filters.set("idBill", form.value.idOrder)
      this.filters.set("clientId", form.value.doc)
      this.filters.set("fromDate", form.value.fromDate)
      this.filters.set("toDate", form.value.toDate)
  }
  this.subscriptions.add(
    this.billingService.getBillsByFilter(this.filters).subscribe(

    )
  )

}

onShowDetails(){

}

onPrint(){

}}
