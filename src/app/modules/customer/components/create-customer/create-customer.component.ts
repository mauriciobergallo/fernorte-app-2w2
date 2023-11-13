import { Component } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';


@Component({
  selector: 'fn-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
customerForm!: NgForm;

formattedBirthDate: string = '';


minDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
maxDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };;
currentYear = new Date().getFullYear();



customer: CustomerRequest = {
firstName:"",
lastName:"",
companyName: "",
ivaCondition: "Monotributo",
birthDate: new Date().toISOString(),
idDocumentType:1,
documentNumber:"",
address:"",
phoneNumber:"",
email: "",
customerType: ""
};

  isCompany: boolean = false; 
  isTypeChecked: boolean = false;

	closeResult = '';

	constructor(private modalService: NgbModal, private customerService: CustomerService, private conversion: CaseConversionPipe) {



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


  onChangeCompany(value: boolean){
    this.customer.customerType = value ? "Juridica" : "Fisica"
	if(value){
		this.customer.firstName = "";
		this.customer.lastName = "";
	}
	else{
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


 
	onSubmitForm(customerForm: NgForm){
		console.log("customerEE", customerForm);
	}
	

}