import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BillOk } from '../../models/BillingOk';
import { BillModel } from '../../models/BillingModelApi';
import { ProductApi } from '../../models/ProductApi';
import { ProductOk } from '../../models/ProductOk';

@Component({
  selector: 'fn-billing-search-list',
  templateUrl: './billing-search-list.component.html',
  styleUrls: ['./billing-search-list.component.css']
})
export class BillingSearchListComponent implements OnInit, OnDestroy {
billList:BillModel[]=[];
billListOk: BillOk[]=[];

private subscriptions = new Subscription();

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
ngOnInit(): void {
  
}

}
