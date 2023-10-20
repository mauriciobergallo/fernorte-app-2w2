import { Component } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'fn-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
//	@ViewChild('customerForm') customerForm!: NgForm;
customerForm!: NgForm;

customer: CustomerRequest = {
firstName:"",
lastName:"",
companyName: "",
ivaCondition: "Monotributo",
birthDate: new Date(),
documentType: 1,
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
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("customer FORM",this.customerForm);


				this.customerService.createCustomer(this.customer);
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
		console.log("customerEE", customerForm);
	}

  

}
