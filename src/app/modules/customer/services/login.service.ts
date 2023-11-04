import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }

  public get() {
    return this.http.get("http://localhost:8080/ping", { withCredentials: true })
  }

  public onLogin(login: Login): Observable<any>{
    const url = "http://localhost:8095/login/";
    return this.http.post(url, login)
  }
}
