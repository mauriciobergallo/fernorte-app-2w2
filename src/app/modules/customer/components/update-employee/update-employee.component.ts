import { Component, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements AfterViewInit {
  @Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('updateEmployee') content: any;

  employeeForm!: NgForm;
  employeeId: number | undefined;

  modalRef: NgbModalRef | undefined;

  formattedBirthDate: string = '';
  employee: Employee = {
    idEmployee: 1,
    firstName: '',
    lastName: '',
    birthDate: new Date(),
	idDocumentType:'',
    idDocumentNumber: '',
    address: '',
    phoneNumber: '',
    personalEmail: '',
  };

  closeResult = '';

  constructor(private modalService: NgbModal, private employeeService: EmployeeService) { }

  ngAfterViewInit(): void {
    this.open();
  }

  loadEmployeeData(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (employeeData) => {
        console.log('EmployeeData from service:', employeeData);
        let transformData = this.convertSnakeToCamel(employeeData);
        this.employee = transformData;
        console.log("Employee", this.employee);

        // Asigna los valores después de cargar los datos
        this.assignValuesToForm();
      },
      (error) => {
        console.error('Error al obtener los datos del empleado', error);
      }
    );
  }

  assignValuesToForm() {
    if (this.employee && this.employee.birthDate) {
      this.formattedBirthDate = this.employee.birthDate.toISOString();
    }
  }

  open() {
    if (this.employeeId) {
      this.loadEmployeeData(this.employeeId);
      console.log('cargando info del empleado');
    }
    this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        console.log("CONTENT", this.content);
        console.log("RESULT", result);
        console.log("employee FORM", this.employeeForm);
        console.log(this.formattedBirthDate);
        debugger;
        let updateEmployee: Employee = {
          idEmployee: this.employeeId,
          firstName: this.employee.firstName,
          lastName: this.employee.lastName,
          birthDate: new Date(),
          address: this.employee.address,
          phoneNumber: this.employee.phoneNumber,
          personalEmail: this.employee.personalEmail,
          idDocumentType: this.employee.idDocumentType,
          idDocumentNumber: this.employee.idDocumentNumber
        };
        console.log("NEW Employee", updateEmployee);
        let employeeInSnake = this.camelToSnake(updateEmployee);
        console.log("Employee EN SNAKE", employeeInSnake);
        this.employeeService.putEmployee(employeeInSnake).subscribe(
          (response) => {
            alert("Se actualizó el empleado");
          },
          (error) => {
            alert("Error en el servidor");
          }
        );
        this.employeeService.clearFields(this.employee);
        this.closeResult = `Closed with: ${result}`;
        this.updateClicked.emit();

      },
      (reason) => {

      },
    );
  }

  onBirthDateChange(event: NgbDateStruct) {
    if (event) {
      const year = event.year || 0;
      const month = event.month || 1;
      const day = event.day || 1;
      const selectedDate = new Date(year, month - 1, day);
      this.formattedBirthDate = selectedDate.toISOString();
    } else {
      this.formattedBirthDate = '';
    }
  }

  setDocumentTypeDescription(id: number): void {
    this.employee.idDocumentType = id;
  }

  onSubmitForm(employeeForm: NgForm) {
    console.log("employeeEE", employeeForm);
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  camelToSnake(obj: any): any {
    const snakeObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        snakeObj[snakeKey] = obj[key];
      }
    }
    return snakeObj;
  }

  convertSnakeToCamel = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(this.convertSnakeToCamel);
    }

    const camelObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        camelObj[camelKey] = this.convertSnakeToCamel(obj[key]);
      }
    }
    return camelObj;
  };
}
