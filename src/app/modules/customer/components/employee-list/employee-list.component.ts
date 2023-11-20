import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { EmployeeResponseDTO } from '../../models/employeeResponseDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'fn-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('employeeForm') updateEmployeeModal: TemplateRef<any> | undefined;
  employeeList: EmployeeResponseDTO[] = [];
  selectedEmployeeId: number | null = null;
  

  constructor(private modalService: NgbModal){}
  
   employeesHardCoded: EmployeeResponseDTO[] = [
    {
      idEmployee: 1,
      firstName: 'Iker',
      lastName: 'Mendez',
      birthDate: '01-01-1985',
      documentType: 1, // Puedes cambiar esto según tus necesidades
      documentNumber: '30123456',
      address: '123 Main St',
      phoneNumber: '555-1234',
      personalEmail: 'john.doe@example.com',
      isActive: true,
    },
    {
      idEmployee: 2,
      firstName: 'Carla ',
      lastName: 'Rodriguez',
      birthDate: '15-05-1985',
      documentType: 2, // Puedes cambiar esto según tus necesidades
      documentNumber: '27987654',
      address: '456 Oak St',
      phoneNumber: '555-5678',
      personalEmail: 'jane.smith@example.com',
      isActive: true,
    },
    {
      idEmployee: 3,
      firstName: 'María',
      lastName: 'Fernandez',
      birthDate: '15-05-1985',
      documentType: 2, // Puedes cambiar esto según tus necesidades
      documentNumber: '35678901',
      address: '456 Oak St',
      phoneNumber: '555-5678',
      personalEmail: 'jane.smith@example.com',
      isActive: true,
    },
    {
      idEmployee: 2,
      firstName: 'Santiago ',
      lastName: 'Herrera',
      birthDate: '15-05-1985',
      documentType: 2, // Puedes cambiar esto según tus necesidades
      documentNumber: '24567890',
      address: '456 Oak St',
      phoneNumber: '555-5678',
      personalEmail: 'jane.smith@example.com',
      isActive: false,
    },
    {
      idEmployee: 2,
      firstName: 'Valentina ',
      lastName: 'Gomez',
      birthDate: '15-05-1985',
      documentType: 2, // Puedes cambiar esto según tus necesidades
      documentNumber: '29876543',
      address: '456 Oak St',
      phoneNumber: '555-5678',
      personalEmail: 'jane.smith@example.com',
      isActive: true,
    },
    {
      idEmployee: 2,
      firstName: 'Lucas ',
      lastName: 'Fernandez',
      birthDate: '15-05-1985',
      documentType: 2, // Puedes cambiar esto según tus necesidades
      documentNumber: '29876544',
      address: '456 Oak St',
      phoneNumber: '555-5678',
      personalEmail: 'jane.smith@example.com',
      isActive: false,
    },
    // Agrega más datos según sea necesario
  ];
  
  

  ngOnInit(): void{
    
    this.employeeList = this.employeesHardCoded;
  }

}
