import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';
import { EmployeeResponseDTO } from '../../models/employeeResponseDTO';

@Component({
  selector: 'fn-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employeeList: EmployeeResponseDTO[] = [];

  constructor(private employeeService: EmployeeService, private conversion: CaseConversionPipe){}

  ngOnInit(): void{
    this.employeeService.getEmployees().subscribe(
      (response) => {
        // let toCamel: EmployeeResponseDTO = this.conversion.toCamelCase(response);
        this.employeeList = response;
      }
    );
  }

  onOptionClick(selectedOption: string) {
    // Acción a realizar cuando se selecciona una opción
    console.log('Opción seleccionada:', selectedOption);
  }

}
