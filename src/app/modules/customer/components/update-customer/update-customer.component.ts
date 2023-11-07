import { Component, OnInit } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CaseConversionPipe } from '../../pipes/case-conversion.pipe';

@Component({
  selector: 'fn-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent  implements OnInit{
//	@ViewChild('customerForm') customerForm!: NgForm;
customerForm!: NgForm;

formattedBirthDate: string = '';

idCustomer:number=0;

minDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };
maxDate: NgbDateStruct = { year: 2000, month: 1, day: 1 };;
currentYear = new Date().getFullYear();




customer: CustomerRequest = {
firstName:"",
lastName:"",
companyName: "",
ivaCondition: "Monotributo",
birthDate: new Date().toISOString(),
idDocumentType: 1,
documentNumber:"",
address:"",
phoneNumber:"",
email: "",
customerType: ""
};

	isCompany: boolean = false; 

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

	ngOnInit(): void {
	
	
	}

	loadCustomerData(idCustomer: number) {
		this.customerService.getCustomerById(idCustomer).subscribe(
		  (customerData) => {
			let transformData= this.conversion.toCamelCase(customerData);
			this.customer = transformData;
			console.log("CUSTOMER", this.customer);
			
		  },
		  (error) => {
			console.error('Error al obtener los datos del cliente', error);
		  }
		);
	  }





	open(content: any) {
	
		this.loadCustomerData(this.idCustomer);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("customer FORM",this.customerForm);
				
				console.log(this.formattedBirthDate)
				this.customer.birthDate = this.formattedBirthDate
				console.log("NEW CUSTOMER", this.customer);
				let newCustomer: CustomerRequest = {
					firstName: this.customer.firstName,
					lastName: this.customer.lastName,
					companyName: this.customer.companyName,
					ivaCondition: this.customer.ivaCondition,
					birthDate: this.formattedBirthDate,
					idDocumentType: this.customer.idDocumentType,
					documentNumber: this.customer.documentNumber,
					address: this.customer.address,
					phoneNumber: this.customer.phoneNumber,
					email: this.customer.email,
					customerType: this.customer.customerType
				}
				let customerEnSnake: CustomerRequest = this.conversion.toSnakeCase(newCustomer);
				console.log("CUSTOMER EN SNAKE", customerEnSnake);
				this.customerService.putCustomer(customerEnSnake, this.idCustomer).subscribe(
					(response) => {
						alert("Se actualizo el cliente")
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
  
	  const selectedDate = new Date(year, month - 1, day);
	  this.formattedBirthDate = selectedDate.toISOString();
	} else {
	  this.formattedBirthDate = '';
	}
  }


	onSubmitForm(customerForm: NgForm){
		console.log("customerEE", customerForm);
	}

	  

}
