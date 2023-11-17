import { Injectable } from '@angular/core';
import { ILocationInfoProduct } from '../../models/ILocationInfoProduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { StorageTicket } from '../../models/StorageTicket.interface';
import { LocationInfoDto } from '../../models/location-info.interface';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private http: HttpClient) {}

  locationBaseUrl: string = 'http://localhost:8081/locations';
  storageTicketBaseUrl: string = 'http://localhost:8081/storage-tickets';

  getProductLocation(codeOrName: string): Observable<ILocationInfoProduct> {
    if (!isNaN(Number(codeOrName))) {
      //es el code
      return this.http.get<ILocationInfoProduct>(
        this.locationBaseUrl + '/product?product_id=' + codeOrName
      );
    } else {
      //es el name
      return this.http.get<ILocationInfoProduct>(
        this.locationBaseUrl +
          '/product?product_name=' +
          this.formatStringToTitleCase(codeOrName)
      );
    }
  }

  getStorageTickets(): Observable<StorageTicket[]> {
    return this.http.get<StorageTicket[]>(this.storageTicketBaseUrl);
  }

  asignTicket(ticketId: number, operatorId: number): Observable<StorageTicket> {
    //a confirmar
    const body = {
      ticket_id: ticketId,
      operator_id: operatorId,
    };
    return this.http.put<StorageTicket>(this.storageTicketBaseUrl, body);
  }

  public getLocationsInfo(): Observable<LocationInfoDto[]> {
    return this.http.get<LocationInfoDto[]>(this.locationBaseUrl).pipe(shareReplay(1))
  }

  private formatStringToTitleCase(inputString: string): string {
    if (!inputString) {
      return '';
    }
    const words = inputString.split(' ');
    const formattedWords = words.map((word) => {
      if (word.length === 2) {
        return word.toLowerCase();
      }
      const firstLetter = word[0].toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    });
    return formattedWords.join(' ');
  }
}
