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
  }

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