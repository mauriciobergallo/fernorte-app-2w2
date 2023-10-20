import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-home-sales',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit  {

  constructor(){} 
  ngOnInit(): void {    
  }


  private readonly modules = {
    Billing: 'Billing',
    SalesOrder: 'SalesOrder',
    PaymentMethod: 'PaymentMethod',

  };

  showBilling: boolean = false;
  showSalesOrder: boolean = false;
  showPaymentMethod: boolean = false;

  onShowBilling() {
    this.onShowModule(this.modules.Billing);
  }

  onShowSalesOrder() {
    this.onShowModule(this.modules.SalesOrder);
  }

  onShowPaymentMethod() {
    this.onShowModule(this.modules.PaymentMethod);
    console.log("on show paymenth method")
  }


  private onShowModule(moduleName: string) {
    this.showBilling = moduleName === this.modules.Billing;
    this.showSalesOrder = moduleName === this.modules.SalesOrder;
    this.showPaymentMethod= moduleName === this.modules.PaymentMethod;
  
  }
}
