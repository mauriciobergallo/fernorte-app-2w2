import { Component, OnInit } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';
import Swal from 'sweetalert2';


@Component({
  selector: 'fn-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit{
	customerForm: FormGroup;
	formattedBirthDate: string = '';
	minDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
	maxDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
	currentYear = new Date().getFullYear();
	customer: CustomerRequest = {
	  firstName: "",
	  lastName: "",
	  companyName: "",
	  ivaCondition: "Monotributo",
	  birthDate: new Date().toISOString(),
	  idDocumentType: 1,
	  documentNumber: "",
	  address: "",
	  phoneNumber: "",
	  email: "",
	  customerType: ""
	};
  
	isCompany: boolean = false;
	isTypeChecked: boolean = false;
  
	closeResult = '';

	constructor(private modalService: NgbModal, private customerService: CustomerService, private fb: FormBuilder, private conversion: CaseConversionPipe) {
		this.customerForm = this.fb.group({
		  customerType: ['', Validators.required],
		  firstName: ['', [Validators.pattern('^[^0-9]+$')]],
		  lastName: ['', [Validators.pattern('^[^0-9]+$')]],
		  companyName: [''],
		  idDocumentType: ['', Validators.required],
		  documentNumber: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(7)]],
		  ivaCondition: ['Monotributo', Validators.required],
		  birthDate: ['', Validators.required],
		  email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')]],
		  address: ['', Validators.required],
		  phoneNumber: ['', Validators.required],
		});
	

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
		this.open(this.customerForm);
	}

	closeForm() {
		this.modalService.dismissAll();
	}


	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("customer FORM",this.customerForm);
				
				console.log(this.formattedBirthDate)
				this.customer.birthDate = this.formattedBirthDate;
				let customerSnake = this.conversion.transform(this.customer);

				this.customerService.postCustomer(customerSnake).subscribe(
					(response) => {
						alert("Se creo el cliente")
					},
					(error) => {
						alert("Error en el servidor")
					}
				)
				this.customerService.clearFields(this.customer);
				this.closeResult = `Closed with: ${result}`;
				

			},
			(reason) => {
				
			},
		);
	}


	onChangeCompany(value: boolean) {
		this.customer.customerType = value ? "Juridica" : "Fisica";
		if (value) {
		  this.customer.firstName = "";
		  this.customer.lastName = "";
		} else {
		  this.customer.companyName = "";
		}
		this.isCompany = value;
		this.isTypeChecked = true;
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

  setDocumentTypeDescription(id: number): string{
	switch(id){
		case 1:
			return "DNI"
		case 2:
			return "Pasaporte"
		case 3:
			return "CUIT"
		case 4:
			return "CUIL"
		case 5:
			return "LC"
		case 6:
			return "LE"
		default:
			return ""
	}
  }


 
  onSubmitForm() {
    if (this.customerForm.valid) {
		// Realizar conversión a snake_case aquí antes de enviar al servidor
		const customerData = this.conversion.toSnakeCase(this.customerForm.value);

		let newCustomer: any = {
			first_name: this.customerForm.value.firstName,
			last_name: this.customerForm.value.lastName,
			birth_date: this.formattedBirthDate,
			document_type: this.customerForm.value.documentType,
			address: this.customerForm.value.address,
			phone_number: this.customerForm.value.phoneNumber,
			document_number: this.customerForm.value.documentNumber,
			personal_email: this.customerForm.value.personalEmail,
		  };
		  let customerInSnake = this.conversion.toSnakeCase(newCustomer);

		  this.customerService.postCustomer(customerData).subscribe(
			(response) => {
			  alert("Se creo el cliente");
			  this.closeForm();
			},
			(error) => {
			  alert("Error en el servidor");
			}
		  );
	
		  // Clear form and reset values
		  this.customerService.clearFields(this.customer);
		  this.closeResult = `Closed with success`;
		} else {
		  Swal.fire('Error', 'El formulario no es válido', 'error');
		  this.customerForm.markAllAsTouched();
		}
	  }

showCancelConfirmation() {
	Swal.fire({
		title: '¿Está seguro que desea cancelar la operacion?',
		text: 'Si cancela, perderá los datos ingresados.',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Sí',
		cancelButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			// Acción a realizar si el usuario confirma la cancelación
			this.closeForm();
		}
	});
}

showConfirmation() {
	// Utiliza SweetAlert o el método que prefieras para mostrar una confirmación
	Swal.fire({
		title: '¿Estás seguro?',
		text: '¿Quieres Registrar al nuevo cliente?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonText: 'Sí',
		cancelButtonText: 'Cancelar'
	}).then((result) => {
		if (result.isConfirmed) {
			// Lógica para agregar el rol
			this.onSubmitForm();
		}
	});
}
	

}
