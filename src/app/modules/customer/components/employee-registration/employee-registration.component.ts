import { Component, ViewChild } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
@Component({
	selector: 'fn-employee-registration',
	templateUrl: './employee-registration.component.html',
	styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent {

	@ViewChild('employeeForm') employeeForm!: NgForm;


	employee: Employee = {
		firstName: "",
		lastName: "",
		birthDate: new Date(),
		documentType: 1,
		documentNumber: "",
		address: "",
		phoneNumber: "",
		personalEmail: ""
	};
	closeResult = '';

	constructor(private modalService: NgbModal, private employeeService: EmployeeService, private ngbDateParserFormatter: NgbDateParserFormatter) { }


	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.employeeService.postEmployee(this.employee).subscribe(
					(response) => {
						console.log('Empleado creado con éxito:', response);
						this.employeeService.clearFields(this.employee);
						this.closeResult = `Closed with: ${result}`;
					},
					(error) => {
						console.error('Error al crear el empleado:', error);
					}
				);
			},
			(reason) => {
				// Handle modal close
			}
		);
	}

	onBirthDateChange(event: any) {
		if (event.target.value) {
			const parsedDate = this.ngbDateParserFormatter.parse(event.target.value);
			this.employee.birthDate = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.day); // Resta 1 al mes para que sea compatible con el objeto Date
		} else {
			this.employee.birthDate = null;
		}
	}

	formattedBirthDate: string = '';

	onSubmitForm(employeeForm: NgForm) {
		console.log("EMPLOYEEEE", employeeForm);
	}

}
