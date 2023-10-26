import { Component, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/sale-order-service.service';
import { ISaleOrder } from '../../interfaces/isale-order';

@Component({
  selector: 'fn-sale-order-search-handler',
  templateUrl: './sale-order-search-handler.component.html',
  styleUrls: ['./sale-order-search-handler.component.css']
})
export class SaleOrderSearchHandlerComponent implements OnInit {
  saleOrdersList: ISaleOrder[] = [];

  constructor(private saleOrderServiceService: SaleOrderServiceService) {
  }
  ngOnInit(): void {
    // this.saleOrdersList = this.saleOrderServiceService.getSaleOrders();
    // console.log(this.saleOrdersList)
  }
  filterReceived:string="";
  filter:string="";
  dates:string="";
  idOrder:string="";
  doc:string="";

  async onReceiveIdOrder(filterSent:any){
    //console.log(this.filter)
    //this.filter=filterSent;
    this.idOrder=filterSent;
    this.saleOrdersList = await this.saleOrderServiceService.getSaleOrdersByFilter(this.idOrder, '', '', '');
  }

  async onReceiveDoc(filterSent:any){
    this.doc=filterSent;
    this.saleOrdersList = await this.saleOrderServiceService.getSaleOrdersByFilter('', this.doc, '', '');
  }

  async onReceiveDates(filterSent:any){
    if(filterSent.includes('-')){
      const index = filterSent.indexOf('/')
      const fromDate = filterSent.slice(0,index)
      const toDate = filterSent.slice(index+1, filterSent.length)
      console.log(fromDate, toDate)
      debugger
      this.saleOrdersList = await this.saleOrderServiceService.getSaleOrdersByFilter("", "", fromDate, toDate);
    }
  }
  
}
