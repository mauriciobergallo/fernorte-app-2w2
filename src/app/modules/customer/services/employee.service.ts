import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }


//Post
createEmployee(employee: Employee){
  console.log("EMPLEADO", employee)

                                  //Petición HTTP Post para crear empleado

}

clearFields(employee: any){
  for (const prop in employee) {
    if (employee.hasOwnProperty(prop)) {
      delete employee[prop];
    }
  }

}




}
