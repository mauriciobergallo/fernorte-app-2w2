import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IContact, ISupplier } from '../../../models/ISuppliers';

@Injectable({
  providedIn: 'root',
})
export class SupliersService {
  url: string = 'http://localhost:8085/suppliers';
  selectedSupplier: number = 0;
  contacts: IContact[] = {} as IContact[];
  suppliers: ISupplier[] = [];

  private productCreated = new Subject<void>();

  productCreated$ = this.productCreated.asObservable();

  notifyProductCreated() {
    this.productCreated.next();
  }

  constructor(private _http: HttpClient) {}

  getSupliers(): Observable<ISupplier[]> {
    console.log(this._http.get<any>("http://localhost:8085/products"));
    return this._http.get<ISupplier[]>(this.url);
  }
  getActiveSuppliers(): Observable<ISupplier[]> {
    return this._http.get<ISupplier[]>(this.url + "?active=true");
  }

  getInactiveSuppliers(): Observable<ISupplier[]> {
    return this._http.get<ISupplier[]>(this.url + "?active=false");
  }

  getSuplier(id: number): Observable<ISupplier> {
    return this._http.get<ISupplier>(this.url + '/' + id);
  }

  getContacts(id: number): Observable<IContact[]> {
    return this._http.get<IContact[]>(this.url + '/' + id + '/contacts');
  }

  addContact(contact: IContact): Observable<IContact> {
    console.log(this.selectedSupplier);
    return this._http.post<IContact>(
      this.url + '/' + this.selectedSupplier + '/contacts',
      contact
    );
  }

  deleteContact(id: number, contact: IContact): any {
    return this._http.delete(this.url + '/contacts/' + contact.id);
  }

  addSuplier(suplier: ISupplier): Observable<ISupplier> {
    return this._http.post<ISupplier>(this.url, suplier);
  }

  deleteSuplier(id: number): Observable<ISupplier> {
    return this._http.put<ISupplier>(this.url + '/delete/' + id, null);
  }

  updateSuplier(suplier: ISupplier): Observable<ISupplier> {
    return this._http.put<ISupplier>(this.url + '/' + suplier.id, suplier);
  }
}
