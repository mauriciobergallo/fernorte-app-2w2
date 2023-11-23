import { Injectable } from '@angular/core';
import { TurnModel } from '../../models/TurnModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnServicesService {
actualTurn:TurnModel=new TurnModel
constructor(private http: HttpClient) { }

private URL = environment.urlTurnBase;

nextTurn():Observable<TurnModel>{
  this.actualTurn=this.clearTurn()
  return this.http.get<TurnModel>(this.URL)   
}
clearTurn():TurnModel{
  this.actualTurn.number=0;
  this.actualTurn.created_at=new Date
  this.actualTurn.id_customer=0;
  return this.actualTurn
}
}


