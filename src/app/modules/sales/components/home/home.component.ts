import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-home-sales',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit  {

  userName: string = "Pepito"

  constructor(){} 
  ngOnInit(): void {    
  }


  private readonly modules = {
    Billing: 'Billing',
    SalesOrders: 'SalesOrder',
    SalesOrderSearch : 'SalesOrderSearch',
    PaymentMethod: 'PaymentMethod',
    CreatePayment: 'CreatePayment',
    SaleOrderSearchList: 'SaleOrderSearchList'
  };

  showBilling: boolean = false;
  showSalesOrder: boolean = false;
  showPaymentMethod: boolean = false;
  showSalesOrderSearch: boolean = false;
  showPayment:boolean = false;
  showSalesOrdersList:boolean = false;

  onShowSalesOrders() {
    this.onShowModule(this.modules.SalesOrders);
  }
  onShowSalesOrdersSearch() {
    this.onShowModule(this.modules.SalesOrderSearch);
  }
  onShowSalesOrdersList() {
    this.onShowModule(this.modules.SaleOrderSearchList);
  }
  onShowBilling() {
    this.onShowModule(this.modules.Billing);
  }
  onShowPaymentMethod() {
    this.onShowModule(this.modules.PaymentMethod);
  }
  onShowPayment() {
    this.onShowModule(this.modules.CreatePayment);
  }

  private onShowModule(moduleName: string) {
    this.showBilling = moduleName === this.modules.Billing;
    this.showSalesOrder = moduleName === this.modules.SalesOrders;
    this.showPaymentMethod= moduleName === this.modules.PaymentMethod;
    this.showSalesOrderSearch=moduleName === this.modules.SalesOrderSearch;
    this.showSalesOrdersList=moduleName === this.modules.SaleOrderSearchList;
    this.showPayment= moduleName === this.modules.CreatePayment;
  }
}
