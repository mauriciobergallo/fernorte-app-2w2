import { Component } from '@angular/core';
import { Employee } from '../../models/employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  constructor(private modalService: NgbModal){
    
  }


  employees: Employee[] = [
    {
      firstName: 'Laura',
      lastName: 'García',
      birthDate: new Date(1985, 4, 15),
      documentType: 1,
      documentNumber: 'A12345678',
      address: 'Calle Sol 123',
      phoneNumber: '987654321',
      personalEmail: 'laura.garcia@example.com'
    },
    // ... más empleados
  ];










}
