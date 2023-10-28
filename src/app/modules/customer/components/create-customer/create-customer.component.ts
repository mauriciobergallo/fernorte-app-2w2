import { Component } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'fn-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
//	@ViewChild('customerForm') customerForm!: NgForm;
customerForm!: NgForm;

formattedBirthDate: string = '';


customer: CustomerRequest = {
	first_name: "",
	last_name: "",
   company_name: "",
   iva_condition: "Monotributo",
	birth_date: new Date().toISOString(),
	id_document_type: 1,
	document_number: "",
	address: "",
	phone_number: "",
	email: "",
	customer_type: ""
};

  isCompany: boolean = false; 
  isTypeChecked: boolean = false;

	closeResult = '';

	constructor(private modalService: NgbModal, private customerService: CustomerService) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("customer FORM",this.customerForm);
				
				console.log(this.formattedBirthDate)
				this.customer.birth_date = this.formattedBirthDate
				this.customerService.postCustomer(this.customer).subscribe(
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
    this.customer.customer_type = value ? "Juridica" : "Fisica"
	if(value){
		this.customer.first_name = "";
		this.customer.last_name = "";
	}
	else{
		this.customer.company_name = "";
	}
    this.isCompany = value;
	this.isTypeChecked = true;
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
