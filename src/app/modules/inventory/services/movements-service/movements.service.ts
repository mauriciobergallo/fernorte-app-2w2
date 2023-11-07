import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovementDto } from '../../models/IMovementDto';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  constructor(private http: HttpClient) {}

  getAllMovements(): Observable<IMovementDto[]> {
    const baseUrl = 'http://localhost:8083/movements';
    return this.http.get<IMovementDto[]>(baseUrl);
  }
}
