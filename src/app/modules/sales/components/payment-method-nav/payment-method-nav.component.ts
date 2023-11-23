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
  deleted: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toMethods(tab: string) {
    this.activeTab = tab;
    this.regist = false;
    this.deleted = false;
  }
  
  toRegisterMethod(tab: string) {
    this.activeTab = tab;
    this.regist = true;
    this.deleted = true
  }

  toDeletedMethod(tab: string) {
    this.activeTab = tab;
    this.deleted = true;
    this.regist=false;
  }
}
