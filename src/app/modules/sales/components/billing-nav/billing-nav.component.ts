import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fn-billing-nav',
  templateUrl: './billing-nav.component.html',
  styleUrls: ['./billing-nav.component.css']
})
export class BillingNavComponent implements OnInit {

  activeTab:string="buscar"
  regist:boolean=false
  search:boolean=true


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
