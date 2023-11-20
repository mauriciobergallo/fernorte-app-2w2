import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  styleUrls: ['./report-nav.component.css']
})
export class ReportNavComponent implements OnInit {

  activeTab:string="sales"
  products:boolean=false
  sales:boolean=false
  report:boolean=false

  constructor() { }

  ngOnInit() {
  }

  toSales(tab:string){
    this.activeTab=tab;
    this.products=false;
    this.sales=true;
  }
  toProducts(tab:string){
    this.activeTab=tab;
    this.products=true;
    this.sales=false;
  }
  toReport(tab:string){
    this.activeTab=tab;
    this.products=false;
    this.sales=false;
    this.report=true;
  }

}
