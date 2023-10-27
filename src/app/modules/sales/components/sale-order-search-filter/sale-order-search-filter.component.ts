import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-sale-order-search-filter',
  templateUrl: './sale-order-search-filter.component.html',
  styleUrls: ['./sale-order-search-filter.component.css']
})
export class SaleOrderSearchFilterComponent {
  @Output() nOrderToSend:EventEmitter<string>= new EventEmitter();
  @Output() docToSend:EventEmitter<string>= new EventEmitter();
  @Output() datesToSend:EventEmitter<string>= new EventEmitter();
  nOrder:string="";
  doc:string="";
  fromDate:string="";
  toDate:string="";
  isSelected:string="";

  onSendNOrder(form : NgForm){
    if(form.valid) {
      this.nOrderToSend.emit(form.value.nOrder);
    }
  }

  onSendDoc(form : NgForm){
    if(form.valid) {
      this.docToSend.emit(form.value.doc);
    }
  }

  onSendDates(form: NgForm){
    if(form.valid) {
      //console.log(this.fromDate+"/"+this.toDate)
      this.datesToSend.emit(this.fromDate+"/"+this.toDate)
    }
  }
}
