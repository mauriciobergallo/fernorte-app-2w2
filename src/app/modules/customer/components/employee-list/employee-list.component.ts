import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';

@Component({
  selector: 'fn-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employeeList: Employee[] = [];

  constructor(private employeeService: EmployeeService, private conversion: CaseConversionPipe){}

  ngOnInit(): void{
    this.employeeService.getEmployees().subscribe(
      (response) => {
        let toCamel: Employee = this.conversion.toCamelCase(response);
        this.employeeList.push(toCamel)
      }
    );
  }

}
