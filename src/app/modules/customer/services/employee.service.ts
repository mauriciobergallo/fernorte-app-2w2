import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeResponseDTO } from '../models/employeeResponseDTO';

@Injectable()
export class EmployeeService {

  private apiUrl = 'http://localhost:8090/employees';
  private newEmployee = '/new-employee';

  constructor(private http: HttpClient) { }

//get
getEmployeeById(employeeId: any): Observable<any>{
  return this.http.get<Employee>(this.apiUrl + "/" + employeeId);
} 

//Post
createEmployee(employee: Employee){
  console.log("EMPLEADO", employee)
  alert(JSON.stringify(employee))
                                 
}

putEmployee(employee: any): Observable<any>{
  debugger;
  let id = employee.idEmployee;
  let employeeOk= employee;
  employeeOk.idDocumentType=1;
  return this.http.put<Employee>(this.apiUrl + "/" + id, employeeOk );

}

postEmployee(employeePost: Employee): Observable<EmployeeResponseDTO>{
  return this.http.post<EmployeeResponseDTO>(`${this.apiUrl}${this.newEmployee}`, employeePost) //Petición HTTP Post para crear empleado

}



clearFields(employee: any){
  for (const prop in employee) {
    if (employee.hasOwnProperty(prop)) {
      delete employee[prop];
    }
  }

}




}
