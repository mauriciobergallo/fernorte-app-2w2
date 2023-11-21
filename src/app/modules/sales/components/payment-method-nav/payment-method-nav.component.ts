// payment-method-nav.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-method-nav',
  templateUrl: './payment-method-nav.component.html',
  styleUrls: ['./payment-method-nav.component.css']
})
export class PaymentMethodNavComponent implements OnInit {

  activeTab: string = 'Metodos';
  regist: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toMethods(tab: string) {
    this.activeTab = tab;
    this.regist = false;
  }

  toRegisterMethod(tab: string) {
    this.activeTab = tab;
    this.regist = true;
  }
}
