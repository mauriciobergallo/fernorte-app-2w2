import { Component, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgForm, FormsModule } from '@angular/forms';
@Component({
  selector: 'fn-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent {

	@ViewChild('employeeForm') employeeForm!: NgForm;


employee: Employee = {firstName:"",
lastName:"",
birthDate: new Date(),
documentType: 0,
documentNumber:"0",
address:"",
phoneNumber:"",
personalEmail:""




};
	closeResult = '';

	constructor(private modalService: NgbModal, private employeeService: EmployeeService) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("EMPLOYEE FORM",this.employeeForm);


				// const formData = this.employeeForm.value;


				// this.employee.name = formData.name;
				// this.employee.lastName = formData.lastName


				this.employeeService.createEmployee(this.employee);
				this.employeeService.clearFields(this.employee);
				this.closeResult = `Closed with: ${result}`;
				

			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  
}
