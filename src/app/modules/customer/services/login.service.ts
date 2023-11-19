import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable, map, switchMap } from 'rxjs';
import { User } from '../models/user';
import { USER_LIST } from '../data/user-data';

@Injectable()
export class LoginService {
  isLogin: boolean = false;
  users: User[] = USER_LIST;
  role: String = '';

  constructor() {}

  public onLogin(login: Login): User | null {
    for (const user of this.users) {
      if ((user.username === login.identity || user.email === login.identity) && user.password === login.password) {
        this.isLogin = true;
        this.role = user.role;
        return user;
      }
    }
    // Si no se encuentra un usuario que cumpla las condiciones, retornar null
    return null;
  }
  
  getRole(){
    return this.role;
  }

  logOut(){
    this.isLogin = false;
    this.role = '';
  }

  public isLogged(){
    return this.isLogin
  }
}
