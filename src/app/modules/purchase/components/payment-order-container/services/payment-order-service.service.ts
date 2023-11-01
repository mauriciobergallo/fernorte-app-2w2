import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Isupplier } from '../../shared/interfaces/isupplier';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderServiceService {

  supplier: Isupplier[] = []
  url: string = 'http://localhost:8080/suppliers'


  constructor(private _http: HttpClient) { }

  getSupplier(id: number):Observable<Isupplier>{
    return this._http.get<Isupplier>(`${this.url}/${id}`)
  }



}
