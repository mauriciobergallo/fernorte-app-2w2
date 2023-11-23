import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../models/role';
import { UserResponseDTO } from '../models/userResponseDTO';
import { User } from '../models/user';
import { NewRole } from '../models/new-role';

@Injectable()
export class UserService {
  private userUpdatedSubject = new BehaviorSubject<void>(undefined);
  document_number!: string;

  private apiUrl = 'http://localhost:8092/';
  private apiUrlGetAllRoles = 'http://localhost:8092/role';
  private apiUrlnewUser = 'http://localhost:8092/users';
  private apiUrlResetEmail = 'http://localhost:8092/users/reset';
  private apiUrlChangePassword = 'http://localhost:8092/users/';
  private baseUrl = 'http://localhost:8092/users';

  constructor(private http: HttpClient) {}

  postNewUser(
    document_number: string,
    password: string,
    roles: number[]
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*',
    });

    const user = {
      document_number,
      password,
      roles,
    };

    return this.http.post(this.apiUrlnewUser, user, { headers });
  }

  modifyUserRoles(userResponse: any, roles: NewRole[]): Observable<UserResponseDTO> {
    let idRoles: number[] = []
    roles.forEach(element => {
      idRoles.push(element.id_role);
    });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<UserResponseDTO>(this.baseUrl+"/modify-roles/"+userResponse.username, idRoles, {
      headers,
    });
  }

  getUserByUsername(username: string): Observable<UserResponseDTO> {
    const url = `${this.baseUrl}/?username=${username}`;
    return this.http.get<UserResponseDTO>(url);
  }

  getUserByDocumentNumber(documentNumber: string): Observable<UserResponseDTO> {
    const url = `${this.baseUrl}/?documentNumber=${documentNumber}`;
    return this.http.get<UserResponseDTO>(url);
  }

  sendResetEmail(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*',
    });

    const data = {
      email,
    };

    return this.http.post(this.apiUrlResetEmail, data, { headers });
  }

  changePassword(
    newPassword: string,
    document_number: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: '*/*',
    });

    const data = {
      document_number: document_number,
      password: newPassword,
    };
    return this.http.put(
      this.apiUrlChangePassword + data.document_number,
      data.password,
      { headers }
    );
  }
  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'users');
  }

  delete(user: User): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/`+user.document_number)
  }
  
  active(user: User): Observable<any>{
    return this.http.patch<any>(`${this.baseUrl}/activate/`+ user.document_number, user)
  }


  getUserUpdatedObservable(){
    return this.userUpdatedSubject.asObservable();
  }

  notifyUserUpdated() {
    this.userUpdatedSubject.next();
  }
}
