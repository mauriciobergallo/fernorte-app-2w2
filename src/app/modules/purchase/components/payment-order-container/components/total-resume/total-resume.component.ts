import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'fn-total-resume',
  templateUrl: './total-resume.component.html',
  styleUrls: ['./total-resume.component.css']
})
export class TotalResumeComponent {

  @Input() total: number = 0;
  @Input() cash: number = 0;
  @Input() debit: number = 0;
  @Input() credit: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    
    let total = changes['total'];
    let cash = changes['cash'];
    let debit = changes['debit'];
    let credit = changes['credit']
    
    if (total && total.currentValue !== total.previousValue) {
      if (total.currentValue) {
        this.total = total.currentValue
      } 
    }
    if (cash && cash.currentValue !== cash.previousValue) {
      if (cash.currentValue) {
        this.cash = cash.currentValue
      }
    }
    if (debit && debit.currentValue !== debit.previousValue) {
      if (debit.currentValue) {
        this.debit = debit.currentValue
      }
    }
    if (credit && credit.currentValue !== credit.previousValue) {
      if (credit.currentValue) {
        this.credit = credit.currentValue
      }
    } 
  }

}
