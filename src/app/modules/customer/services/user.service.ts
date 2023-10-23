import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlGetAllRoles = 'http://localhost:8095/role';
  private apiUrlnewUser = 'http://localhost:8095/users/new-user';

  constructor(private http: HttpClient) { }

  GetAllRoles(): Observable<Role[]> {
    return this.http.get<any[]>(this.apiUrlGetAllRoles).pipe(
      map(data => data.map(item => {
        const role = new Role();
        role.name = item.name;
        role.id_role = item.id_role;
        role.area = item.area;
        return role;
      }))
    );
  }

  postNewUser(documentNumber: string, password: string, roles: number[]) {
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
}