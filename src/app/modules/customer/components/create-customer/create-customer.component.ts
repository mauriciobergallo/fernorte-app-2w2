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
firstName:"",
lastName:"",
companyName: "",
ivaCondition: "Monotributo",
birthDate: new Date(),
documentType:{
	idDocumentType: 1,
	description: "CUIT"
},
documentNumber:"",
address:"",
phoneNumber:"",
email: "",
customerType: "Fisica"
};

	isCompany: boolean = false; 

	closeResult = '';

	constructor(private modalService: NgbModal, private customerService: CustomerService, private datePipe: DatePipe) {}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("customer FORM",this.customerForm);
				
				console.log(this.formattedBirthDate)
				let newCustomer: any = {
					firstName: this.customer.firstName,
					lastName: this.customer.lastName,
					companyName: this.customer.companyName,
					ivaCondition: this.customer.ivaCondition,
					birthDate: this.formattedBirthDate,
					documentType:{
						idDocumentType: 1,
						description: "CUIT"
					},
					documentNumber: this.customer.documentNumber,
					address: this.customer.address,
					phoneNumber: this.customer.phoneNumber,
					email: this.customer.email,
					customerType: this.customer.customerType
				}
				this.customerService.postCustomer(newCustomer).subscribe(
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
  }

  onBirthDateChange(event: NgbDateStruct) {
	if (event) {
	  // Obtén el año, mes y día de ngbDatepicker
	  const year = event.year || 0;
	  const month = event.month || 1;
	  const day = event.day || 1;
  
	  // Crea una instancia de Date con la fecha seleccionada
	  const selectedDate = new Date(year, month - 1, day);
  
	  // Formatea la fecha en el formato deseado
	  this.formattedBirthDate = selectedDate.toISOString();
	} else {
	  // Si no se ha seleccionado una fecha, puedes manejarlo como prefieras
	  this.formattedBirthDate = '';
	}
  }


	onSubmitForm(customerForm: NgForm){
		console.log("customerEE", customerForm);
	}

  

}
