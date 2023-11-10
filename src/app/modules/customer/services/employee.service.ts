import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeResponseDTO } from '../models/employeeResponseDTO';

@Injectable()
export class EmployeeService {

  private apiUrl = 'http://localhost:8090/employees';

  constructor(private http: HttpClient) { }

//get
getEmployeeById(idEmployee: any): Observable<any>{
  return this.http.get<Employee>(this.apiUrl + "/" + idEmployee);
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

delete(employee: EmployeeResponseDTO): Observable<any>{
  return this.http.delete<any>(`${this.apiUrl}`+"/"+employee.idEmployee)
}

active(employee: EmployeeResponseDTO): Observable<any>{
  return this.http.put<any>(`${this.apiUrl}`+"/"+ employee.idEmployee +"/active", employee)
}



clearFields(employee: any){
  for (const prop in employee) {
    if (employee.hasOwnProperty(prop)) {
      delete employee[prop];
    }
  }

}




}
