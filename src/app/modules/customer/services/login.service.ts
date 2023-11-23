import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable, map, switchMap } from 'rxjs';
import { User } from '../models/user';
import { USER_LIST } from '../data/user-data';

@Injectable()
export class LoginService {
  users: User[] = USER_LIST;
  user: User | null = null;

  constructor() {}

  public onLogin(login: Login): User | null {
    for (const user of this.users) {
      if ((user.username === login.identity || user.email === login.identity) && user.password === login.password) {
        this.user = user;
        return user;
      }
    }
    return null;
  }

  getEmail(){
    if(this.user != null){
      return this.user.email;
    }
    return '';
  }
  

  getArea(){
    if(this.user != null){
      return this.user.area;
    }
    return '';
  }

  getRoles(){
    if(this.user != null){
      return this.user.role;
    }
    return '';
  }

  logOut(){
    this.user = null;
  }

  public isLogged(){
    return this.user != null
  }
}
