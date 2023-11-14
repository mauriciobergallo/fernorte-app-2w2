import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact, IContacts, ISupplier } from '../models/ISuppliers';

@Injectable({
  providedIn: 'root',
})
export class SupliersService {
  url: string = 'http://localhost:8080/suppliers';

  
  constructor(private _http: HttpClient) {}

  

  getSupliers(): Observable<ISupplier[]> {
    return this._http.get<ISupplier[]>(this.url);
  }

  getSuplier(id: number): Observable<ISupplier> {
    return this._http.get<ISupplier>(this.url + '/' + id);
  }

  getContacts(id: number): Observable<IContacts> {
    return this._http.get<IContacts>(this.url + '/' + id + '/contacts');
  }

  addContact(id: number, contact: Contact): Observable<Contact> {
    return this._http.post<Contact>(this.url + '/' + id + '/contacts', contact);
  }

  deleteContact(id: number, contact: Contact): any {
    return this._http.delete(this.url + '/' + id + '/contacts/' + contact.id);
  }


  addSuplier(suplier: ISupplier): Observable<ISupplier> {
    return this._http.post<ISupplier>(this.url, suplier);
  }

  deleteSuplier(suplier: ISupplier): Observable<ISupplier> {
    return this._http.delete<ISupplier>(this.url + '/' + suplier.id);
  }

  updateSuplier(suplier: ISupplier): Observable<ISupplier> {
    return this._http.put<ISupplier>(this.url + '/' + suplier.id, suplier);
  }
}
