import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { UserResponseDTO } from '../models/userResponseDTO';

@Injectable()
export class UserService {
  document_number!: string;

  private apiUrlGetAllRoles = 'http://localhost:8095/role';
  private apiUrlnewUser = 'http://localhost:8095/users/new-user';
  private apiUrlResetEmail = 'http://localhost:8095/users/reset';
  private apiUrlChangePassword = 'http://localhost:8095/users/change_password';
  private baseUrl = 'http://localhost:8095/users';

  constructor(private http: HttpClient) { } 

  postNewUser(documentNumber: string, password: string, roles: number[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });
  
    const user = {
      documentNumber,
      password,
      roles
    };
  
    return this.http.post(this.apiUrlnewUser, user, { headers });
  }

    modifyUserRoles(userResponse: UserResponseDTO): Observable<UserResponseDTO> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put<UserResponseDTO>(this.baseUrl, userResponse, { headers });
    }
    
  
    getUserByUsername(username: string): Observable<UserResponseDTO> {
      const url = `${this.baseUrl}/${username}`;
      return this.http.get<UserResponseDTO>(url);
    }
  

   sendResetEmail(email: string): Observable<any> {
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'accept': '*/*'
     });

     const data = {
       email
     };

     return this.http.post(this.apiUrlResetEmail, data, { headers });
   }

   changePassword(newPassword: string): Observable<any> {
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'accept': '*/*'
     });

     const data = {
       document_number: this.document_number,
       password: newPassword,
     };

     return this.http.put(this.apiUrlChangePassword, data, { headers });
   }
  
}