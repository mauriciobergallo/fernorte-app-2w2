import { Injectable } from '@angular/core';
import { ILocationInfoProduct } from '../../models/ILocationInfoProduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }


  getProductLocation(codeOrName: string): Observable<ILocationInfoProduct> {
    
    const baseUrl = 'http://localhost:8080/locations/product';

    if(!isNaN(Number(codeOrName))){
      //es el code
      return this.http.get<ILocationInfoProduct>(
        baseUrl+'?product_id=' + codeOrName
      );
    }else{
            //es el name
            return this.http.get<ILocationInfoProduct>(
              baseUrl+'?product_name=' + this.formatStringToTitleCase(codeOrName)
            );
    }
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
