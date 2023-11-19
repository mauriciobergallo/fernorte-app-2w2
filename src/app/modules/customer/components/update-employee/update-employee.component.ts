import { Component, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import {
  NgbDateStruct,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';
import { EmployeeResponseDTO } from '../../models/employeeResponseDTO';
import { DocumentType } from '../../models/documentType';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm!: NgForm;

  formattedBirthDate: string = '';

  idEmployee: number = 0;

  lstDocumentType: DocumentType[] = [];

  @Input() employeeToUpdate: EmployeeResponseDTO | undefined;

  @Input() onlyForRead: boolean = false;

  minDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
  maxDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
  currentYear = new Date().getFullYear();

  dataPickerBirth: NgbDateStruct = { year: 2000, month: 1, day: 1 };

  employee: Employee = {
    firstName: '',
    lastName: '',
    birthDate: new Date().toISOString(),
    idDocumentType: 1,
    idDocumentNumber: '',
    address: '',
    phoneNumber: '',
    personalEmail: '',
  };

  closeResult = '';

  constructor(
    public modalService: NgbModal,
    private employeeService: EmployeeService,
    private conversion: CaseConversionPipe
  ) {
    // Obtén la fecha actual
    const currentDate = new Date();
    // Resta 16 años de la fecha actual
    const minYear = currentDate.getFullYear() - 16;
    const minMonth = currentDate.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, ng-bootstrap es de 1 a 12
    const minDay = currentDate.getDate();

    // Asigna la fecha calculada a minDate
    this.minDate = { year: minYear, month: minMonth, day: minDay };

    this.maxDate = {
      year: currentDate.getFullYear() - 100, //Cambiar este numero si se quiere bajar la edad
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };
  }

  ngOnInit(): void {
    console.log('EMPLEADO', this.employeeToUpdate);
    this.mapEmployee();

    this.dataPickerBirth = this.birthDateFormated(this.employee.birthDate);
    console.log(this.employee.idDocumentType)
    this.employeeService.getDocumentType().subscribe(
      (response)=>{
        this.lstDocumentType = this.conversion.toCamelCase(response);
      }
    );
  }

  loadEmployeeData(idEmployee: number) {
    this.employeeService.getEmployeeById(idEmployee).subscribe(
      (employeeData) => {
        console.log('carga empleado', employeeData);

        let transformData = this.conversion.toCamelCase(employeeData);
        this.employee = transformData;
        console.log('Employee', this.employee);
      },
      (error) => {
        console.error('Error al obtener los datos del Empleado', error);
      }
    );
  }

  mapEmployee() {
    if (this.employeeToUpdate != null) {
      this.idEmployee = this.employeeToUpdate.idEmployee;
      this.employee.firstName = this.employeeToUpdate.firstName;
      this.employee.lastName = this.employeeToUpdate.lastName;
      this.employee.idDocumentType = this.setIdDocumentType(this.employeeToUpdate.documentType);
      this.employee.personalEmail = this.employeeToUpdate.personalEmail;
      this.employee.phoneNumber = this.employeeToUpdate.phoneNumber;
      this.employee.birthDate = this.employeeToUpdate.birthDate;
      this.employee.idDocumentNumber = this.employeeToUpdate.documentNumber;
      this.employee.address = this.employeeToUpdate.address;
    }
  }

  setIdDocumentType(documentType: string | number): number{
    switch(documentType){
      case 'DNI':
        return 1;
      case 'Pasaporte':
        return 2;
      case 'CUIT':
        return 3;
      case 'CUIL':
        return 4;
      case 'LC':
        return 5;
      case 'LE':
        return 6;
      default:
        return 0;
    }
  }
  
  open(content: any) {
   
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(
        (result) => {
          console.log('CONTENT', content);
          console.log('RESULT', result);
          console.log('employee FORM', this.employeeForm);

          console.log(this.formattedBirthDate);
          this.employee.birthDate = this.formattedBirthDate;
          console.log('NEW Employee', this.employee);
          let newEmployee: Employee = {
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            birthDate: this.formattedBirthDate,
            idDocumentType:  this.employee.idDocumentType,
            idDocumentNumber: this.employee.idDocumentNumber,
            address: this.employee.address,
            phoneNumber: this.employee.phoneNumber,
            personalEmail: this.employee.personalEmail,
          };
          let employeeInSnake: Employee =
            this.conversion.toSnakeCase(newEmployee);
          console.log('EMPLOYEE EN SNAKE', employeeInSnake);
          this.employeeService
            .putEmployee(employeeInSnake, this.idEmployee)
            .subscribe(
              (response) => {
                this.showInfoUpdateResult();
                this.modalService.dismissAll();
              },
              (error) => {
                this.showInfoErrorResult();
                this.modalService.dismissAll();
              }
            );
          this.employeeService.clearFields(this.employee);
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {}
      );
  }

  onSubmit(employeeForm: any) {
    console.log('FORMULARIO DE EMPLEADOS', employeeForm);

    console.log(this.formattedBirthDate);
    this.employee.birthDate = this.formattedBirthDate;
    console.log('NEW Employee', this.employee);
    let newEmployee: Employee = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      birthDate: this.formattedBirthDate,
      idDocumentType: this.employee.idDocumentType,
      idDocumentNumber: this.employee.idDocumentNumber,
      address: this.employee.address,
      phoneNumber: this.employee.phoneNumber,
      personalEmail: this.employee.personalEmail,
    };
    let employeeInSnake: Employee = this.conversion.toSnakeCase(newEmployee);
    console.log('EMPLOYEE EN SNAKE', employeeInSnake);
    this.employeeService
      .putEmployee(employeeInSnake, this.idEmployee)
      .subscribe(
        (response) => {
          this.showInfoUpdateResult();
          this.employeeService.notifyEmployeeUpdated();
          this.modalService.dismissAll();
        },
        (error) => {
         this.showInfoErrorResult();
         this.modalService.dismissAll();
         
        }
      );
  }

  onBirthDateChange(event: NgbDateStruct) {
    if (event) {
      // Obtén el año, mes y día de ngbDatepicker
      const year = event.year || 0;
      const month = event.month || 1;
      const day = event.day || 1;

      const selectedDate = new Date(year, month - 1, day);
      this.formattedBirthDate = selectedDate.toISOString();
    } else {
      this.formattedBirthDate = '';
    }
  }

  birthDateFormated(date: string): NgbDateStruct {
    const dateComponents = date.split('-').map(Number);

    if (dateComponents.length === 3) {
      return {
        year: dateComponents[2],
        month: dateComponents[1],
        day: dateComponents[0],
      };
    } else {
      return { year: 2000, month: 1, day: 1 };
    }
  }


  showConfirmation(employeeForm: any) {
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: '¿Quieres actualizar el empleado?',
		  icon: 'question',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, actualizar',
		  cancelButtonText: 'Cancelar'
		}).then((result) => {
		  if (result.isConfirmed) {	
			this.onSubmit(employeeForm);
		  }
		});
	  }



    closeForm() {
      this.modalService.dismissAll();
      }
    
	  showCancelConfirmation() {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'Si cancela, perderá los datos ingresados. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, seguir editando'
      }).then((result) => {
        if (result.isConfirmed) {
        // Acción a realizar si el usuario confirma la cancelación
        this.closeForm();
        }
      });
      }

      showInfoUpdateResult(){
        Swal.fire({
          title: 'Resultado',
          text: 'Se actualizó el empleado',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'ok',
        });
      }

      showInfoErrorResult(){
        Swal.fire({
          title: 'Resultado',
          text: 'Error en el servidor',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'ok',
        });
      }
    
   onSubmitForm(employeeForm: NgForm) {
     console.log('Employee', employeeForm);
   }
}
