import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetReceptionOrderDto } from '../../models/get-reception-order';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http: HttpClient) { }


  getAllReceptionOrders(): Observable<GetReceptionOrderDto[]> {
    
    const baseUrl = 'http://localhost:8081/reception-orders';
    return this.http.get<GetReceptionOrderDto[]>(baseUrl);

  }
}
