import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewRole } from '../models/new-role';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  document_number: string = "";

  private apiUrlGetAllRoles = 'http://localhost:8095/role';
  private apiUrlnewUser = 'http://localhost:8095/users/new-user';
  private apiUrlResetEmail = 'http://localhost:8095/users/reset';
  private apiUrlChangePassword = 'http://localhost:8095/users/change_password';

  constructor(private http: HttpClient) { }

  GetAllRoles(): Observable<NewRole[]> {
    return this.http.get<NewRole[]>(this.apiUrlGetAllRoles);
  }

  postNewUser(documentNumber: string | undefined, password: string, roles: number[]) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    const user = {
      documentNumber,
      password,
      roles
    };

    return this.http.post(`${this.apiUrlnewUser}`, user, { headers });
  }

  sendResetEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    const data = {
      email
    };

    return this.http.post(this.apiUrlResetEmail, data, { headers });
  }

  changePassword(newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    const data = {
      document_number: this.document_number,
      password: newPassword,
    };

    return this.http.put(this.apiUrlChangePassword, data, { headers });
  }
}