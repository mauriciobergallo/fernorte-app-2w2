import { Component } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { EnumDocumentType } from '../../models/customer-request';
import { documentType } from '../../models/customer-request';

@Component({
  selector: 'fn-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
//	@ViewChild('customerForm') customerForm!: NgForm;
fuentedeDatos: EnumDocumentType[] = [EnumDocumentType.DNI, EnumDocumentType.CUIT, EnumDocumentType.CUIL, EnumDocumentType.PASSAPORTE, EnumDocumentType.LC, EnumDocumentType.LE];

customerForm!: NgForm;

customer: CustomerRequest = {
firstName:"",
lastName:"",
companyName: "",
ivaCondition: "Monotributo",
birthDate: new Date().toISOString(), // Convierte la fecha en cadena
documentType: {
		idDocumentType: 1,
		description: "DNI"
		},
documentNumber:"",
address:"",
phoneNumber:"",
email: "",
customerType: "Fisica"
};

  isCompany: boolean = false; 

	closeResult = '';

	constructor(private modalService: NgbModal, private customerService: CustomerService) {}

	open(content: any) {
		this.customer.birthDate = new Date(this.customer.birthDate).toISOString();
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("customer FORM",this.customerForm);

debugger
				this.customerService.postCustomer(this.customer).subscribe(

					(data) => {
						console.log("DATA", data);
					},
					(error) => {
						console.log("ERROR", error);
					},
					() => {
						alert("Comp´letado");
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
    this.isCompany = value;
  }


	onSubmitForm(customerForm: NgForm){
	//	console.log("customerEE", customerForm);

		
	}

  

}
