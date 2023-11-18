import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetReceptionOrderDto } from '../../models/get-reception-order';
import { IUpdateReceptionOrder } from '../../models/receptions-orders/UpdateReceptionOrderDto.interface';
import { IUpdatedOrderDto } from '../../models/receptions-orders/UpdatedOrderDto.interface';
import { IUpdatedDetailDto } from '../../models/receptions-orders/updatedDetailDto.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  private baseUrl: string = 'http://localhost:8082/reception-orders';
  constructor(private http: HttpClient) {}

  getAllReceptionOrders(): Observable<GetReceptionOrderDto[]> {
    return this.http.get<GetReceptionOrderDto[]>(this.baseUrl);
  }
  getReceptionOrderById(orderId: number): Observable<GetReceptionOrderDto> {
    return this.http.get<GetReceptionOrderDto>(this.baseUrl + '/' + orderId);
  }
  getReceptionOrderDetailsById(
    orderId: number
  ): Observable<IUpdatedDetailDto[]> {
    return this.http.get<IUpdatedDetailDto[]>(
      this.baseUrl + '/' + orderId + '/details'
    );
  }
  updateReceptionOrder(
    orderData: IUpdateReceptionOrder
  ): Observable<IUpdatedOrderDto> {
    return this.http.put<IUpdatedOrderDto>(this.baseUrl, orderData);
  }
}
