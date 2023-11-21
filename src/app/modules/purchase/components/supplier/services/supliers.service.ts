import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IContact, ISupplier } from '../../../models/ISuppliers';

@Injectable({
  providedIn: 'root',
})
export class SupliersService {
  url: string = 'http://localhost:5434/suppliers';
  selectedSupplier: number = 0;
  contacts: IContact = {} as IContact;
  suppliers: ISupplier[] = [];

  private productCreated = new Subject<void>();

  productCreated$ = this.productCreated.asObservable();

  notifyProductCreated() {
    this.productCreated.next();
  }

  constructor(private _http: HttpClient) {}

  getSupliers(): Observable<ISupplier[]> {
    return this._http.get<ISupplier[]>(this.url);
  }
  getActiveSuppliers(): Observable<ISupplier[]> {
    return this._http.get<ISupplier[]>(this.url + "/active");
  }

  getInactiveSuppliers(): Observable<ISupplier[]> {
    return this._http.get<ISupplier[]>(this.url + "/inactive");
  }

  getSuplier(id: number): Observable<ISupplier> {
    return this._http.get<ISupplier>(this.url + '/' + id);
  }

  getContacts(id: number): Observable<IContact> {
    return this._http.get<IContact>(this.url + '/' + id + '/contacts');
  }

  /* addContact(contact: Contact): Observable<Contact> {
    console.log(this.selectedSupplier);
    return this._http.post<Contact>(
      this.url + '/' + this.selectedSupplier + '/contacts',
      contact
    );
  } */

  /* deleteContact(id: number, contact: Contact): any {
    return this._http.delete(this.url + '/' + id + '/contacts/' + contact.id);
  } */

  addSuplier(suplier: ISupplier): Observable<ISupplier> {
    return this._http.post<ISupplier>(this.url, suplier);
  }

  deleteSuplier(id: number): Observable<ISupplier> {
    return this._http.delete<ISupplier>(this.url + '/' + id);
  }

  updateSuplier(suplier: ISupplier): Observable<ISupplier> {
    return this._http.put<ISupplier>(this.url + '/' + suplier.id, suplier);
  }
}
