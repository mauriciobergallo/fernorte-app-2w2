import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map } from 'rxjs';
import { NewRole } from '../models/new-role';

@Injectable()
export class RoleService {

  private apiUrl = "http://localhost:8092/roles";

  private rolesUpdatedSubject = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) { }


  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

  clearFields(role: any) {
    for (const prop in role) {
      if (role.hasOwnProperty(prop)) {
        delete role[prop];
      }
    }
  }

  getAllRoles(): Observable<NewRole[]> {
    return this.http.get<NewRole[]>(`${this.apiUrl}/`);
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

  getRolesUpdatedObservable(): Observable<void> {
    return this.rolesUpdatedSubject.asObservable();
  }

  notifyRolesUpdated() {
    this.rolesUpdatedSubject.next();
  }

}