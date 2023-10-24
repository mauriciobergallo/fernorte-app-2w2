import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TurnService } from '../../services/turn.service';

@Component({
  selector: 'fn-btn-no-customer',
  templateUrl: './btn-no-customer.component.html',
  styleUrls: ['./btn-no-customer.component.css']
})
export class BtnNoCustomerComponent implements OnInit {
  numberTurn: number = 0;
  @Output() back = new EventEmitter<void>();

  constructor(private turnService: TurnService){}

  ngOnInit() {
    this.turnService.postData().subscribe((response: any) => {
      this.numberTurn = response;});
    console.log(this.numberTurn);

    setTimeout(() => {
      this.returnToMainPage();
    }, 15000);
  }

  returnToMainPage() {
    this.back.emit();
  }
}
