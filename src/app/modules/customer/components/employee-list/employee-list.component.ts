import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';
import { EmployeeResponseDTO } from '../../models/employeeResponseDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  @ViewChild('employeeUpdate') updateEmployeeModal: TemplateRef<any> | undefined;
  employeeList: EmployeeResponseDTO[] = [];
  

  constructor(private employeeService: EmployeeService, private conversion: CaseConversionPipe, private modalService: NgbModal){}

  ngOnInit(): void{
    this.onLoad()
  }

  onLoad(){
    this.employeeService.getEmployees().subscribe(
      (response) => {
        let toCamel: EmployeeResponseDTO[] = this.conversion.toCamelCase(response);
        this.employeeList = toCamel;
      },
      (error) => {
        console.log(error)
      }
    );
  }
  
  openUpdateEmployeeModal(idEmployee: number) {
    const modalRef = this.modalService.open(UpdateEmployeeComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.employeeId = idEmployee; // Pasar el ID del empleado al componente de actualización
    
    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.updateEmployeeModal);
    });
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
