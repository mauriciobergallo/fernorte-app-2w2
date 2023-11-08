import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8092/users';

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }

  activateUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.patch(url, null);
  }

  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  constructor(private http: HttpClient) { }
}
