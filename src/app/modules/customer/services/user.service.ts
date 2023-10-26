import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../models/userResponseDTO';
import { Role } from '../models/role';


@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:8095/users';

  constructor(private http: HttpClient) {}

  modifyUserRoles(targetUsername: string, newRoles: Role[]): Observable<UserResponseDTO> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/modify-roles/${targetUsername}`;
    return this.http.put<UserResponseDTO>(url, newRoles, { headers });
  }

  

  getUserByUsername(username: string): Observable<UserResponseDTO> {
    const url = `${this.baseUrl}/${username}`;
    return this.http.get<UserResponseDTO>(url);
  }
  
}