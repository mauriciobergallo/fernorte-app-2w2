import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-sale-order-search-filter',
  templateUrl: './sale-order-search-filter.component.html',
  styleUrls: ['./sale-order-search-filter.component.css']
})
export class SaleOrderSearchFilterComponent {
  @Output() filter:EventEmitter<string> = new EventEmitter();
  nOrder:string="";
  fromDate:string="";
  toDate:string="";
  doc:string="";
  dates:string="";


  onSendNOrder(form : NgForm){
    this.nOrder = form.value.nOrder
    this.onSendFilter(form, this.nOrder)
  }

  onSendDoc(form : NgForm){
    this.doc = form.value.doc
    this.onSendFilter(form, this.doc)
  }

  onSendDates(form: NgForm){
    this.dates=this.fromDate+"_"+this.toDate
    this.onSendFilter(form, this.dates)
  }

  onSendFilter(form : NgForm, filter:string){
    if(form.valid){
      console.log(filter)
      this.filter.emit(filter);
    }
  }
  
}
