import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeResponseDTO } from '../models/employeeResponseDTO';

@Injectable()
export class EmployeeService {

  private employeeUpdatedSubject = new BehaviorSubject<void>(undefined);

  private apiUrl = 'http://localhost:8090/employees';

  constructor(private http: HttpClient) { }

//get
getEmployeeById(idEmployee: any): Observable<any>{
  return this.http.get<Employee>(this.apiUrl + "/" + idEmployee);
} 

getEmployeeByDocumentNumber(documentNumber: string): Observable<any>{
  return this.http.get<Employee>(this.apiUrl + "?documentNumber=" + documentNumber);
} 

//Post
createEmployee(employee: Employee){
  console.log("EMPLEADO", employee)
  alert(JSON.stringify(employee))
                                 
}

putEmployee(employeePut: any, idEmployee: number): Observable<any>{
     
  return this.http.put<Employee>(this.apiUrl + "/" + idEmployee, employeePut );

}

postEmployee(employeePost: Employee): Observable<EmployeeResponseDTO>{
  return this.http.post<EmployeeResponseDTO>(`${this.apiUrl}`, employeePost) 

}

getEmployees(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}`+"/")
}

getDocumentType(): Observable<any>{
  return this.http.get<any>("http://localhost:8090/document-type/")
}


delete(employee: EmployeeResponseDTO): Observable<any>{
  return this.http.delete<any>(`${this.apiUrl}`+"/"+employee.idEmployee)
}

active(employee: EmployeeResponseDTO): Observable<any>{
  return this.http.put<any>(`${this.apiUrl}`+"/"+ employee.idEmployee +"/active", employee)
}


  clearFields(employee: any) {
    for (const prop in employee) {
      if (employee.hasOwnProperty(prop)) {
        delete employee[prop];
      }
    }
  }




  getEmployeeUpdatedObservable(): Observable<void> {
    return this.employeeUpdatedSubject.asObservable();
  }

  notifyEmployeeUpdated() {
    this.employeeUpdatedSubject.next();
  }

}
