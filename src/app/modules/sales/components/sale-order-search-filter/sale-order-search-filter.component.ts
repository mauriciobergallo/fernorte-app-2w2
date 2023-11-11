import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SaleOrderServiceService } from '../../services/salesOrder/sale-order-service.service';

@Component({
  selector: 'fn-sale-order-search-filter',
  templateUrl: './sale-order-search-filter.component.html',
  styleUrls: ['./sale-order-search-filter.component.css']
})
export class SaleOrderSearchFilterComponent {

  constructor(private saleOrderService: SaleOrderServiceService) {
  }
  // @Output() nOrderToSend:EventEmitter<string>= new EventEmitter();
  // @Output() docToSend:EventEmitter<string>= new EventEmitter();
  // @Output() datesToSend:EventEmitter<string>= new EventEmitter();
  nOrder:string="0";
  doc:string="0";
  fromDate:string="";
  toDate:string="";
  isSelected:string="";

  // onSendNOrder(form : NgForm){
  //   if(form.valid) {
  //     this.saleOrderService.getSaleOrdersByIdOrder(form.value.nOrder)
  //   }
  // }

  // onSendDoc(form : NgForm){
  //   if(form.valid) {
  //     this.saleOrderService.getSaleOrdersByDoc(form.value.doc);
  //   }
  // }

  // onSendDates(form: NgForm){
  //   if(form.valid) {
  //     //console.log(this.fromDate+"/"+this.toDate)
  //     debugger
  //     this.saleOrderService.getSaleOrdersByDate(this.fromDate+"/"+this.toDate);
  //     //this.datesToSend.emit(this.fromDate+"/"+this.toDate)
  //   }
  // }
}
