import { Component, OnInit } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fn-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent  implements OnInit{
//	@ViewChild('customerForm') customerForm!: NgForm;
customerForm!: NgForm;

formattedBirthDate: string = '';


customer: CustomerRequest = {
idCustomer: 0,
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

	constructor(private modalService: NgbModal, private customerService: CustomerService) {}

	ngOnInit(): void {
	
	
	}

	loadCustomerData(customerId: number) {
		this.customerService.getCustomerById(customerId).subscribe(
		  (customerData) => {
			let transformData= this.convertSnakeToCamel(customerData);
			this.customer = transformData;
			console.log("CUSTOMER", this.customer);
			
		  },
		  (error) => {
			console.error('Error al obtener los datos del cliente', error);
		  }
		);
	  }





	open(content: any) {
	
		this.loadCustomerData(1);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("customer FORM",this.customerForm);
				
				console.log(this.formattedBirthDate)
				debugger;
				let newCustomer: CustomerRequest = {
					
					idCustomer: this.customer.idCustomer,
					firstName: this.customer.firstName,
					lastName: this.customer.lastName,
					companyName: this.customer.companyName,
					ivaCondition: this.customer.ivaCondition,
					birthDate: new Date().toISOString(),
					
				
					idDocumentType: this.customer.idDocumentType ,
					documentNumber: this.customer.documentNumber,
					address: this.customer.address,
					phoneNumber: this.customer.phoneNumber,
					email: this.customer.email,
					customerType: this.customer.customerType
				}
				console.log("NEW CUSTOMER", newCustomer);
				let customerEnSnake = this.camelToSnake(newCustomer);
				console.log("CUSTOMER EN SNAKE", customerEnSnake);
				this.customerService.putCustomer(customerEnSnake).subscribe(
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

  setDocumentTypeDescription(id: number): void{
	this.customer.idDocumentType=id;
	
  }


	onSubmitForm(customerForm: NgForm){
		console.log("customerEE", customerForm);
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
