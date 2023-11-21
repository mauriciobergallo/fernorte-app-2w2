import { Injectable } from '@angular/core';
import { TurnProvider } from './TurnProvider';
import { TurnModel } from '../../models/TurnModel';

@Injectable({
  providedIn: 'root'
})
export class TurnServicesService {
actualTurn:TurnModel=new TurnModel
constructor(private tunrProvider:TurnProvider) { }

nextTurn():TurnModel{
  this.actualTurn=this.clearTurn()
  this.tunrProvider.getNextTurn().subscribe((turn)=>{
    this.actualTurn=turn    
    return this.actualTurn
  })
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


