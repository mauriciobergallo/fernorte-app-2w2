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

//	@ViewChild('employeeForm') employeeForm!: NgForm;
employeeForm!: NgForm;

employee: Employee = {
firstName:"",
lastName:"",
birthDate: new Date(),
documentType: 1,
documentNumber:"",
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


				this.employeeService.createEmployee(this.employee);
				this.employeeService.clearFields(this.employee);
				this.closeResult = `Closed with: ${result}`;
				

			},
			(reason) => {
				
			},
		);
	}




	onSubmitForm(employeeForm: NgForm){
		console.log("EMPLOYEEEE", employeeForm);
	}

  
}
