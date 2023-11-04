import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormsModule, Validators, AbstractControl  } from '@angular/forms';
@Component({
  selector: 'fn-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css']
})
export class EmployeeRegistrationComponent  {
	
	
	minDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
	maxDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };;
	currentYear = new Date().getFullYear();

	maxLengthDocument : number = 0;

	formattedBirthDate: string = '';

	employeeForm: FormGroup;
	constructor(private modalService: NgbModal, private employeeService: EmployeeService, private fb: FormBuilder) {

		this.employeeForm = this.fb.group({
			firstName: ['', [Validators.required, Validators.pattern('^[^0-9]+$')]],
			lastName: ['', [Validators.required, Validators.pattern('^[^0-9]+$')]],	
			documentType: [0, Validators.required],
			documentNumber: ['', [Validators.required, Validators.maxLength(this.maxLengthDocument)]],
			birthDate:['', Validators.required],
			personalEmail:['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]] ,
			address:['', Validators.required],
			phoneNumber:['', Validators.required]});


    // Obtén la fecha actual
    const currentDate = new Date();
    // Resta 16 años de la fecha actual
    const minYear = currentDate.getFullYear() - 16;
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

	@ViewChild('content') contentModal: any;

employee: Employee = {
firstName:"",
lastName:"",
birthDate: new Date(),
documentType: 0,
documentNumber:"",
address:"",
phoneNumber:"",
personalEmail:""

};
	closeResult = '';
	nameTouched = false;
	lastNameTouched = false;
	phoneNumberTouched = false;
	emailTouched = false;
	documentPattern = '';
	documentNumberTouched = false;

	get firstNameControl(): AbstractControl | null {
		return this.employeeForm.get('firstName');
	  }

	  get lastNameControl(): AbstractControl | null {
		return this.employeeForm.get('lastName');
	  }

	  get documentNumberControl(): AbstractControl | null {
		return this.employeeForm.get('documentNumber');
	  }

	  get personalEmailControl(): AbstractControl | null{
		return this.employeeForm.get('personalEmail');
	  }

	onDocumentTypeChange() {

		console.log("FORM", this.employeeForm);


		const documentNumberControl = this.employeeForm.get('documentNumber');

		console.log("DOCUMENT NUMBER", documentNumberControl);
		const selectedDocumentType = this.employeeForm.value.documentType;
		// Restablecer el valor del campo de documento
		this.employee.documentNumber = '';




		
		// Aplicar las reglas de formato según el tipo de documento
		switch (Number(selectedDocumentType)) {
		  case 2: // DNI
			// Permite solo números
			documentNumberControl?.setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
			this.maxLengthDocument = 10;
		//	this.documentPattern = '^[0-9]+$';
			break;
	
		  case 3: // CUIT 
		  case 4: // CUIL
			// Permite números y formato XX-XXXXXXXX-X
			documentNumberControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{8}-[0-9]$')]);
			this.maxLengthDocument = 12;
			break;
	
		  case 5: // LC
		  case 6: // LE
			// Permite solo números
			documentNumberControl?.setValidators([Validators.required, Validators.pattern('^[0-9]+$')]);
			this.maxLengthDocument = 12;
			break;
	
		  case 7: // Pasaporte
			// Permite letras y números en formato AAA-000000
			documentNumberControl?.setValidators([Validators.required, Validators.pattern( '^[A-Za-z]{3}-[0-9]{6}$')]);
			this.maxLengthDocument = 10;
			break;
	
		  default:
			// Para otras opciones o cuando se restablezca a "Seleccione una opción"
			this.documentPattern = '';
			break;
		}
	  }

	  onDocumentNumberInput() {
		if (Number(this.employee.documentType) === 3 || Number(this.employee.documentType === 4)) {
		  // Aplicar el formato XX-XXXXXXXX-X mientras el usuario escribe
		  const input = this.employee.documentNumber.replace(/\D/g, '').substring(0, 11);
		  this.employee.documentNumber = input.replace(/^(\d{2})(\d{8})(\d{1})$/, '$1-$2-$3');
		}
	  }

	  
	getDocumentNumberErrorMessage() {
		switch (Number(this.employee.documentType)) {
		case 2:
			this.documentNumberTouched = false;
			return 'Ingresa solo números para DNI.';
		case 5:
		case 6:
			this.documentNumberTouched = false;
			return 'Ingresa solo números para LC o LE.';
		case 3:
		case 4:
			this.documentNumberTouched = false;
			return 'Ingresa un formato válido (00-00000000-0).';
		case 7:
			this.documentNumberTouched = false;
			return 'Ingresa un formato válido (AAA-000000).';
		default:
			this.documentNumberTouched = false;
			return 'Ingresa un formato válido.';
		}
	}
		


	open(content: any) {
		console.log("THIS", this);
		console.log("content", content);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static'  }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("EMPLOYEE FORM",this.employeeForm);


				this.employeeService.createEmployee(this.employee);
				this.employeeService.clearFields(this.employee);
				this.closeResult = `Closed with: ${result}`;
				this.employeeForm.reset();

				let newemployee: any = {
					firstName: this.employeeForm.value.firstName,
					lastName: this.employeeForm.value.lastName,
					birthDate: this.formattedBirthDate,
					documentType: this.employeeForm.value.documentType,
					address: this.employeeForm.value.address,
					phoneNumber: this.employeeForm.value.phoneNumber,
					documentNumber: this.employeeForm.value.documentNumber,
					personalEmail: this.employeeForm.value.personalEmail
				}

				this.employeeService.postEmployee(newemployee).subscribe(


					(response) => {
						alert("Se creo el empleado")
					},
					(error) => {
						alert("Error en el servidor")
					}
				)

				this.employeeForm.reset();

			},
			(reason) => {
				this.employeeForm.reset();
			},
		);
	}


	onBirthDateChange(event: any) {
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


	onSubmitForm(employeeForm: FormGroup){
		console.log("EMPLOYEEEE", employeeForm);
	}

  
}
