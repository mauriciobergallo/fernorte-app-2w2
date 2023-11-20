import { Component } from '@angular/core';

@Component({
  selector: 'fn-tax-nav',
  templateUrl: './tax-nav.component.html',
  styleUrls: ['./tax-nav.component.css']
})
export class TaxNavComponent {
  activeTab: string = 'taxes';
  regist: boolean = false;

  constructor() { }

  toTaxes(tab: string) {
    this.activeTab = tab;
    this.regist = false;
  }

  toRegisterTax(tab: string) {
    this.activeTab = tab;
    this.regist = true;
  }
}
