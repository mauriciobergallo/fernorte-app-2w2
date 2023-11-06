import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-sale-order-nav',
  templateUrl: './sale-order-nav.component.html',
  styleUrls: ['./sale-order-nav.component.css']
})
export class SaleOrderNavComponent implements OnInit {

  activeTab:string="buscar"
  regist:boolean=false
  search:boolean=false


  constructor() { }

  ngOnInit() {
  }

  toRegist(tab:string){
    this.activeTab=tab;
    this.regist=true;
    this.search=false;
  }
  toSearch(tab:string){
    this.activeTab=tab;
    this.search=true;
    this.regist=false;
  }
}
