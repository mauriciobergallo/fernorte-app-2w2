import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RoleService {

  private apiUrl = "http://localhost:8092/roles";

  constructor(private http:HttpClient) { }

  //Post
  createRole(role : Role): Observable<Role>{
    console.log("Role", role);
    return this.http.post<Role>(this.apiUrl,role );
  }
  
  clearFields(role: any){
    for (const prop in role) {
      if (role.hasOwnProperty(prop)) {
        delete role[prop];
      }
    }
  
  }


}