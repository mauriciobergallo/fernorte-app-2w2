import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';
import { EmployeeResponseDTO } from '../../models/employeeResponseDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';


@Component({
  selector: 'fn-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('employeeForm') updateEmployeeModal: TemplateRef<any> | undefined;
  employeeList: EmployeeResponseDTO[] = [];
  selectedEmployeeId: number | null = null;
  

  constructor(private employeeService: EmployeeService, private conversion: CaseConversionPipe, private modalService: NgbModal){}
  
   employeesHardCoded: EmployeeResponseDTO[] = [
    {
      idEmployee: 1,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '01-01-1985',
      documentType: 1, // Puedes cambiar esto según tus necesidades
      documentNumber: '123456789',
      address: '123 Main St',
      phoneNumber: '555-1234',
      personalEmail: 'john.doe@example.com',
      isActive: true,
    },
    {
      idEmployee: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '15-05-1985',
      documentType: 2, // Puedes cambiar esto según tus necesidades
      documentNumber: '987654321',
      address: '456 Oak St',
      phoneNumber: '555-5678',
      personalEmail: 'jane.smith@example.com',
      isActive: false,
    },
    // Agrega más datos según sea necesario
  ];
  
  

  ngOnInit(): void{
    
    this.onLoad()
    this.employeeList = this.employeesHardCoded;
  }

  onLoad(){
    this.employeeService.getEmployees().subscribe(
      (response) => {
        console.log(response)
        let toCamel: EmployeeResponseDTO[] = this.conversion.toCamelCase(response);
        this.employeeList = toCamel;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  openUpdateEmployeeModal(employee: EmployeeResponseDTO) {
    this.selectedEmployeeId = employee.idEmployee;
    const modalRef = this.modalService.open(UpdateEmployeeComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalRef.componentInstance.employeeToUpdate = employee; // Pasar el ID del empleado al componente de actualización
    
    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.updateEmployeeModal);
      console.log('se abrio el modal del empleado');
      
    });
  }

  onClickInfo(employee: EmployeeResponseDTO){

    const modalRef = this.modalService.open(UpdateEmployeeComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalRef.componentInstance.employeeToUpdate = employee; // Pasar el ID del empleado al componente de actualización
    modalRef.componentInstance.onlyForRead = true;

  }

  onDelete(employee: EmployeeResponseDTO){
    //Confirmacion

    this.employeeService.delete(employee).subscribe(
      (response) => {
        alert("Se dio de baja el empleado")
        this.onLoad()
      },
      (error) => (
        console.log(error)
      )
    )
  }

  onActive(employee: EmployeeResponseDTO){
    //Confirmacion

    this.employeeService.active(employee).subscribe(
      (response) => {
        alert("Se dio de alta el empleado")
        this.onLoad()
      },
      (error) => (
        console.log(error)
      )
    )
  }

}
