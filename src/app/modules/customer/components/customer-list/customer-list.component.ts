import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

@Component({
  selector: 'fn-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[] = [];
  @ViewChild('customerForm') updateCustomerModal: TemplateRef<any> | undefined;
  selectedCustomerId: number | null = null;

  constructor(private customerService: CustomerService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadUser();
//    this.customerList = this.customers;
  }

   customers: Customer[] = [
    {
      id_customer: 1,
      first_name: "John",
      last_name: "Doe",
      company_name: "ABC Inc",
      iva_condition: "IVA Registered",
      email: "john.doe@example.com",
      phone_number: "123-456-7890",
      birth_date: new Date("1990-01-01"),
      address: "123 Main St, City",
      document_number: "ABC123",
      document_type: "ID Card",
      customer_type: "Corporate",
      discount_factor: 0.1,
      customer_category: "Gold",
    },
    {
      id_customer: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone_number: "987-654-3210",
      birth_date: new Date("1985-05-15"),
      document_number: "XYZ789",
      document_type: "Passport",
      customer_type: "Individual",
    },
    // Add more customer objects as needed
  ];

  loadUser() {
    this.customerService.getAllCustomer().subscribe((data: Customer[]) => {
      this.customerList = data;
    });
  }

  onOptionClick(selectedOption: string) {
    console.log('Opción seleccionada:', selectedOption);
  }

  openUpdateCustomerModal(customer: Customer) {
    console.log(customer);
    this.selectedCustomerId = customer.id_customer;
    const modalRef = this.modalService.open(UpdateCustomerComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.componentInstance.customerToUpdate = customer; // Pasar el ID del cliente al componente de actualización
    
    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.updateCustomerModal);
      console.log('se abrio el modal del cliente');
      
    });
  }
}