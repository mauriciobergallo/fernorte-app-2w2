import { Component } from '@angular/core';

@Component({
  selector: 'fn-tax-nav',
  templateUrl: './tax-nav.component.html',
  styleUrls: ['./tax-nav.component.css']
})
export class TaxNavComponent {
  activeTab:string="taxes"
  regist:boolean=false
  search:boolean=false
  update:boolean=false
  delete:boolean=false


  constructor() { }

  ngOnInit() {
  }

  toTaxes(tab:string){
    this.activeTab=tab;
    this.regist=true;
  }

}
