import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../enviroment/environment";
import { SaleOrderModel } from "../../models/SaleOrderModel";
import { IResponse } from "../../interfaces/IResponse";
import { TurnModel } from "../../models/TurnModel";
@Injectable()

export class TurnProvider {
  private urlBase = environment.urlTurnBase;

  constructor(private http: HttpClient) {
  }
  getNextTurn():Observable<TurnModel>{
    const url = "https://my-json-server.typicode.com/113833-PRADO/fakeTURN/turn";
    return this.http.get<TurnModel>(url)
  }
  
}