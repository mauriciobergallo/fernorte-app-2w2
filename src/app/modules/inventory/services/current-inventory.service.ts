import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationInfoDto } from '../models/location-info.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrentInventoryService {

  baseEndPoint : string = 'http://localhost:8080/locations/';

  constructor(private httpClient: HttpClient) { 
    
  }
  public getLocationsInfo(): Observable<LocationInfoDto[]> {
    return this.httpClient.get<LocationInfoDto[]>(this.baseEndPoint+'products');
  }
}
