  import { Injectable } from '@angular/core';
  import { Tax } from '../../models/Tax';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { environment } from '../../enviroment/environment';

  const URL: string = environment.urlBillBase+"/tax";

  @Injectable({
    providedIn: 'root'
  })
  export class TaxService {

    constructor(private http: HttpClient) { }

    getTaxList(): Observable<Tax[]> {
      return this.http.get<Tax[]>(URL);
    }

    createTax(tax: Tax): Observable<Tax> {
      console.log("payment service create payment: ", tax)
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<Tax>(URL, tax, { headers });
    }

    updateTax(tax: Tax): Observable<Tax> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<Tax>(URL, tax, { headers });
    }
  }

