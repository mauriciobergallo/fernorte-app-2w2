import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable, map, switchMap } from 'rxjs';
import { UserCheckLogin } from '../models/user-check-login';


@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

  public get() {
    return this.http.get("http://localhost:8080/ping", { withCredentials: true })
  }


   public onLogin(login: Login): Observable<UserCheckLogin> {
     const loginUrl = "http://localhost:8095/login/";
  
     return this.http.post(loginUrl, login).pipe(
       switchMap((response: any) => {
         const username = response.username;
         const passwordReset = response.passwordReset;
  
         return this.getUserDetails(username, passwordReset);
       })
     );
   }
  
   private getUserDetails(username: string, passwordReset: boolean): Observable<UserCheckLogin> {
     const userDetailsUrl = `http://localhost:8095/users/${username}`;
  
     return this.http.get(userDetailsUrl).pipe(
       map((userDetails: any) => {
         const user: UserCheckLogin = {          
           username:userDetails.username,

           document_number: userDetails.document_number,
           roles: userDetails.roles.map((role: any) => {
             return {
               id_role: role.id_role,
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
