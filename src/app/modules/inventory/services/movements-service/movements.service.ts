import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovementDto } from '../../models/IMovementDto';
import { Pagination } from '../../models/pagination';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  constructor(private http: HttpClient) {}
  private  baseUrl = 'http://localhost:8083/movements';

  getAllMovements(): Observable<IMovementDto[]> {
    return this.http.get<IMovementDto[]>(this.baseUrl);
  }

  getPaginationMovements(currentPage: number) : Observable<Pagination> {
    return this.http.get<Pagination>(this.baseUrl+"/page/"+currentPage)
  }
}
