import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NewRole } from '../models/new-role';

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

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/`);
  }

  getAllWithFormat(): Observable<NewRole[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => {
        const role = new NewRole();
        role.name = item.name;
        role.id_role = item.id_role;
        role.area = item.area;
        return role;
      }))
    );
  }

}