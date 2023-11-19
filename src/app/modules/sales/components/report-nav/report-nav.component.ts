import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-nav',
  templateUrl: './report-nav.component.html',
  styleUrls: ['./report-nav.component.css']
})
export class ReportNavComponent implements OnInit {

  activeTab:string="buscar"
  regist:boolean=false
  search:boolean=false
  update:boolean=false
  delete:boolean=false
  anual:boolean=false


  constructor() { }

  ngOnInit() {
  }

  toRegist(tab:string){
    this.activeTab=tab;
    this.regist=false;
    this.anual=true;
  }
  toSearch(tab:string){
    this.activeTab=tab;
    this.search=true;
  }
  toUpdate(tab:string){
    this.activeTab=tab;
    this.update=true;
    this.regist=false;
    this.anual=false;
  }
  toDelete(tab:string){
    this.activeTab=tab;
    this.delete=true;
  }

}
