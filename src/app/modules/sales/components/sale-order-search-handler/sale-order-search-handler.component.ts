import { Component } from '@angular/core';

@Component({
  selector: 'fn-sale-order-search-handler',
  templateUrl: './sale-order-search-handler.component.html',
  styleUrls: ['./sale-order-search-handler.component.css']
})
export class SaleOrderSearchHandlerComponent {
  filter:string="";
  fromDate:string="";
  toDate:string="";

  onReceiveFilter(filterSent:string){
    console.log(this.filter)
    this.filter=filterSent;
  }
  
  onSeparateFilter(filter:string){
    if(this.filter.includes('-')){
      const index = this.filter.indexOf('/')
        this.fromDate = this.filter.slice(0,index)
        this.toDate = this.filter.slice(index, this.filter.length)
    }
  }
}
