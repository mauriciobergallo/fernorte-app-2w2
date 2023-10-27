import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public get() {
    return this.http.get("http://localhost:8080/ping", { withCredentials: true })
  }

  public onLogin(login: Login): Observable<User> {
    const loginUrl = "http://localhost:8095/login/";
  
    return this.http.post(loginUrl, login).pipe(
      switchMap((response: any) => {
        const username = response.username;
        const passwordReset = response.passwordReset;
  
        return this.getUserDetails(username, passwordReset);
      })
    );
  }
  
  private getUserDetails(username: string, passwordReset: boolean): Observable<User> {
    const userDetailsUrl = `http://localhost:8095/users/${username}`;
  
    return this.http.get(userDetailsUrl).pipe(
      map((userDetails: any) => {
        const user: User = {
          username,
          documentNumber: userDetails.document_number,
          roles: userDetails.roles.map((role: any) => {
            return {
              idRole: role.idRole,
              name: role.name,
              area: role.area
            };
          }),
          password_reset: userDetails.password_reset,
          first_login: userDetails.first_login
        };
        return user;
      })
    );
  }
}