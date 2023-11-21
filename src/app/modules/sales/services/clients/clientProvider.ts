import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../enviroment/environment";
import { ICustomer } from "../../interfaces/iCustomer";

@Injectable()

export class ClientProvider {
  private urlClientsBase = environment.urlClientsBase;

  constructor(private http: HttpClient) {
  }

    getlistClients(): Observable<ICustomer> {
      const url = this.urlClientsBase + `/customers/3`;
      return this.http.get<ICustomer>(url);
    }
  }