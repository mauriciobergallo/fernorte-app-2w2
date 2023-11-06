import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BillOk } from '../../models/BillingOk';
import { BillModel } from '../../models/BillingModelApi';
import { ProductApi } from '../../models/ProductApi';
import { ProductOk } from '../../models/ProductOk';
import { BillServiceService } from '../../services/billing/bill-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-billing-search-list',
  templateUrl: './billing-search-list.component.html',
  styleUrls: ['./billing-search-list.component.css']
})
export class BillingSearchListComponent implements OnInit, OnDestroy {
billList:BillModel[]=[];
billListOk: BillOk[]=[];

idBill:string="";
doc:string="";
fromDate:string="";
toDate:string="";

private subscriptions = new Subscription();

constructor(private billingService: BillServiceService) {
}

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
ngOnInit(): void {
  this.subscriptions.add(
    this.billingService.getBills().subscribe(
      (response:BillModel[])=>{
        this.billList=response;
        for(let item of this.billList){
          this.billList.push(item)
        }
        console.log(this.billList)
      }
    )
  )
}
onSubmit(form: NgForm){

}
}
