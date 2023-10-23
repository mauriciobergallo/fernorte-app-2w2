import { Component, OnInit } from '@angular/core';
import { SaleOrderServiceService } from '../../services/sale-order-service.service';
import { SaleOrderModel } from '../../models/SaleOrderModel';

@Component({
  selector: 'fn-sale-order-search-handler',
  templateUrl: './sale-order-search-handler.component.html',
  styleUrls: ['./sale-order-search-handler.component.css']
})
export class SaleOrderSearchHandlerComponent implements OnInit {
  saleOrdersList: SaleOrderModel[] = [];

  constructor(private saleOrderServiceService: SaleOrderServiceService) {
  }
  ngOnInit(): void {
    this.saleOrdersList = this.saleOrderServiceService.getSaleOrders();
    console.log(this.saleOrdersList)
  }

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

  // async getSaleOrdersList() {
  //   const saleOrdersList = await this.saleOrderServiceService.getSaleOrders();
  //   console.log(saleOrdersList)
  // }

  async getSaleOrdersByFilter(){
    this.saleOrdersList = await this.saleOrderServiceService.getSaleOrdersByFilter(this.filter);
  }
  
}
