import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurnResponse } from '../models/turn-response';

@Injectable()
export class TurnService {
  ToCustomer: boolean = false;
  ToNoCustomer: boolean = false;
  Main: boolean = true;
  

  private apiUrl = 'http://localhost:8091/turns';
constructor(private http: HttpClient) { }

postData(documentNumber ?: string): Observable < TurnResponse > {
  const body = new FormData();
  if(documentNumber) {
    body.append('documentNumber', documentNumber);
  }
    return this.http.post<TurnResponse>(`${this.apiUrl}`, body);
    
    
}


}
