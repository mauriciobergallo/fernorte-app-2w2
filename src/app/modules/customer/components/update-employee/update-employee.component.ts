import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'fn-update-employee',
	templateUrl: './update-employee.component.html',
	styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
	//	@ViewChild('customerForm') customerForm!: NgForm;

	@Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();

	employeeForm!: NgForm;
	employeeId: number | undefined;

	formattedBirthDate: string = '';


	employee: Employee = {
		idEmployee: 1,
		firstName: '',
		lastName: '',
		birthDate: new Date(),
		documentType: 1,
		documentNumber: '',
		address: '',
		phoneNumber: '',
		personalEmail: '',
	};

	isCompany: boolean = false;

	closeResult = '';

	constructor(private modalService: NgbModal, private employeeService: EmployeeService) { }

	ngOnInit(): void {


	}

	loadEmployeeData(employeeId: number) {
		this.employeeService.getEmployeeById(employeeId).subscribe(
			(employeeData) => {
				let transformData = this.convertSnakeToCamel(employeeData);
				this.employee = transformData;
				console.log("Employee", this.employee);

			},
			(error) => {
				console.error('Error al obtener los datos del empleado', error);
			}
		);
	}





	open(content: any) {

		if (this.employeeId) {
			this.loadEmployeeData(this.employeeId);
		  }
		  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("employee FORM", this.employeeForm);

				console.log(this.formattedBirthDate)
				debugger;
				let newEmployee: Employee = {
					idEmployee: this.employee.idEmployee,
					firstName: this.employee.firstName,
					lastName: this.employee.lastName,
					birthDate: new Date(),
					address: this.employee.address,
					phoneNumber: this.employee.phoneNumber,
					personalEmail: this.employee.personalEmail,
					documentType: this.employee.documentType,
					documentNumber: this.employee.documentNumber

				}
				console.log("NEW Employee", newEmployee);
				let employeeInSnake = this.camelToSnake(newEmployee);
				console.log("Employee EN SNAKE", employeeInSnake);
				this.employeeService.putEmployee(employeeInSnake).subscribe(
					(response) => {
						alert("Se actualizo el empleado")
					},
					(error) => {
						alert("Error en el servidor")
					}
				)
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

	setDocumentTypeDescription(id: number): void {
		this.employee.documentType = id;

	}


	onSubmitForm(employeeForm: NgForm) {
		console.log("employeeEE", employeeForm);
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

		const camelObj: { [key: string]: any } = {}; // Anotación de tipo

		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
				camelObj[camelKey] = this.convertSnakeToCamel(obj[key]);
			}
		}
		return camelObj;
	};




}
