import { Injectable } from '@angular/core';
import { TurnProvider } from './TurnProvider';
import { TurnModel } from '../../models/TurnModel';

@Injectable({
  providedIn: 'root'
})
export class TurnServicesService {
actualTurn:TurnModel={number:1,created_at:new Date,id_customer:0};
constructor(private tunrProvider:TurnProvider) { }

nextTurn():TurnModel{
  this.actualTurn=this.clearTurn()
  this.actualTurn.id_customer = 1;
  this.actualTurn.number+=1
  console.log(this.actualTurn)  
  return this.actualTurn
}

clearTurn():TurnModel{
  this.actualTurn.number=0;
  this.actualTurn.created_at=new Date
  this.actualTurn.id_customer=0;
  return this.actualTurn
}
}


