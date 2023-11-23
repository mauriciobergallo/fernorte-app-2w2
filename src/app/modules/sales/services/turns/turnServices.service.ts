import { Injectable } from '@angular/core';
import { TurnModel } from '../../models/TurnModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnServicesService {
  turns:TurnModel[]=[{
    number:1,id_customer:1,created_at:new Date
  },{
    number:2,id_customer:2,created_at:new Date
  },{
    number:3,id_customer:3,created_at:new Date
  },{
    number:4,id_customer:4,created_at:new Date
  },{
    number:5,id_customer:5,created_at:new Date
  },{
    number:6,id_customer:1,created_at:new Date
  },{
    number:7,id_customer:2,created_at:new Date
  },{
    number:8,id_customer:3,created_at:new Date
  },{
    number:9,id_customer:4,created_at:new Date
  },{
    number:10,id_customer:5,created_at:new Date
  }]
  count:number=0;
constructor(private http: HttpClient) { }

private URL = environment.urlTurnBase;
contador(){
  this.count+=1
  if(this.count>5){
    this.count=1
  }
}
nextTurn():TurnModel{
  this.contador()  
  return this.turns[this.count-1]  
}
}


