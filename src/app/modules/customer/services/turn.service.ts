import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurnResponse } from '../models/turn-response';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  ToCustomer: boolean = false;
  ToNoCustomer: boolean = false;
  Main: boolean = true;

  private apiUrl = 'http://localhost:8080/turns';
  private newTurn = '/new-turn';

  constructor(private http: HttpClient) {}
  
  postData(documentNumber?: string): Observable<TurnResponse> {
    debugger;
    const body = new FormData();
    if (documentNumber) {
      body.append('documentNumber', documentNumber);      
    }

    return this.http.post<TurnResponse>(`${this.apiUrl}${this.newTurn}`, body);
  }
}
