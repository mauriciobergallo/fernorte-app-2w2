import { Component, Input, OnInit, Optional, TemplateRef } from '@angular/core';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';


@Component({
  selector: 'fn-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{
  

  employeeForm!: NgForm;

  formattedBirthDate: string = '';
  
  @Input() idEmployee:number=0;
  
  minDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
  maxDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };;
  currentYear = new Date().getFullYear();
  
  documentTypes = [
    { label: 'DNI', value: 1 },
    { label: 'Pasaporte', value: 2 },
    { label: 'CUIT', value: 3 },
    { label: 'CUIL', value: 4 },
    { label: 'LC', value: 5 },
    { label: 'LE', value: 6 }    
  ];

  
  
  
  employee: Employee = {
  firstName:"",
  lastName:"",
  birthDate: new Date().toISOString(),
  idDocumentType: 1,
  idDocumentNumber:"",
  address:"",
  phoneNumber:"",
  personalEmail: ""  
  };  
  
    closeResult = '';
  
    constructor(public modalService: NgbModal, private employeeService: EmployeeService, private conversion: CaseConversionPipe) {
  
              // Obtén la fecha actual
            const currentDate = new Date();
            // Resta 16 años de la fecha actual
            const minYear = currentDate.getFullYear() - 5;
            const minMonth = currentDate.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, ng-bootstrap es de 1 a 12
            const minDay = currentDate.getDate();
          
            // Asigna la fecha calculada a minDate
            this.minDate = { year: minYear, month: minMonth, day: minDay };
          
          
            this.maxDate = {
              year: currentDate.getFullYear() - 150, //Cambiar este numero si se quiere bajar la edad
              month: currentDate.getMonth() + 1,
              day: currentDate.getDate()
              };
  
  
    }
  
    ngOnInit(): void {
    
      console.log(this);
    }
    
  	loadEmployeeData(idEmployee: number) {
      this.employeeService.getEmployeeById(idEmployee).subscribe(
        (employeeData) => {
          console.log('carga empleado',employeeData);
          
        let transformData= this.conversion.toCamelCase(employeeData);
        this.employee = transformData;
        console.log("Employee", this.employee);
        
        },
        (error) => {
        console.error('Error al obtener los datos del Empleado', error);
        }
      );
      }
  
  
  
  
  
    open(content:any) {
    
      this.loadEmployeeData(this.idEmployee);
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then(
        (result) => {
  
          console.log("CONTENT", content);
          console.log("RESULT", result);
          console.log("employee FORM",this.employeeForm);
          
          console.log(this.formattedBirthDate)
          this.employee.birthDate = this.formattedBirthDate
          console.log("NEW Employee", this.employee);
          let newEmployee: Employee = {
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,            
            birthDate: this.formattedBirthDate,
            idDocumentType: this.employee.idDocumentType,
            idDocumentNumber: this.employee.idDocumentNumber,
            address: this.employee.address,
            phoneNumber: this.employee.phoneNumber,
            personalEmail: this.employee.personalEmail
            
          }
          let employeeInSnake: Employee = this.conversion.toSnakeCase(newEmployee);
          console.log("EMPLOYEE EN SNAKE", employeeInSnake);
          this.employeeService.putEmployee(employeeInSnake, this.idEmployee).subscribe(
            (response) => {
              alert("Se actualizo el empleado")
              
            },
            (error) => {
              alert("Error en el servidor")
            }
          )
          this.employeeService.clearFields(this.employee);
          this.closeResult = `Closed with: ${result}`;
          
  
        },
        (reason) => {
          
        },
      );
    }
  
  
  
   onSubmit(employeeForm: any){

    console.log("FORMULARIO DE EMPLEADOS", employeeForm);
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
  
  
    onSubmitForm(employeeForm: NgForm){
      console.log("Employee", employeeForm);
    }
  
      
  
  }
  

