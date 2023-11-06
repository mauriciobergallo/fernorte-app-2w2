import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-method-nav',
  templateUrl: './payment-method-nav.component.html',
  styleUrls: ['./payment-method-nav.component.css']
})
export class PaymentMethodNavComponent implements OnInit {

  activeTab:string="buscar"
  regist:boolean=false
  search:boolean=false
  update:boolean=false
  delete:boolean=false


  constructor() { }

  ngOnInit() {
  }

  toRegist(tab:string){
    this.activeTab=tab;
    this.regist=true;
  }
  toSearch(tab:string){
    this.activeTab=tab;
    this.search=true;
  }
  toUpdate(tab:string){
    this.activeTab=tab;
    this.update=true;
  }
  toDelete(tab:string){
    this.activeTab=tab;
    this.delete=true;
  }

}
