import { Employee } from './../../models/employee';
import { Component } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { NgForm, FormsModule } from '@angular/forms';
@Component({
	selector: 'fn-employee-registration',
	templateUrl: './employee-registration.component.html',
	styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent {

	//@ViewChild('employeeForm') employeeForm!: NgForm;
	employeeForm!: NgForm;
	formattedBirthDate: string = '';

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

	constructor(private modalService: NgbModal, private employeeService: EmployeeService) { }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("EMPLOYEE FORM", this.employeeForm);

				let newemployee: any = {
					firstName: this.employee.firstName,
					lastName: this.employee.lastName,
					birthDate: this.formattedBirthDate,
					documentType: this.employee.documentType,
					address: this.employee.address,
					phoneNumber: this.employee.phoneNumber,
					documentNumber: this.employee.documentNumber,
					personalEmail: this.employee.personalEmail
				}
				this.employeeService.postEmployee(newemployee).subscribe(


					(response) => {
						alert("Se creo el empleado")
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




	onSubmitForm(employee: NgForm) {
		console.log("employee", employee);
	}


}
