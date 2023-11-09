import { Component, OnInit } from '@angular/core';
import { CustomerActResponse } from '../../models/customer-response';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'fn-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customerList: CustomerActResponse[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe((data: CustomerActResponse[]) => {
      this.customerList = data;
    });
    console.log(this.customerList);
  }

  onOptionClick(selectedOption: string) {
    console.log('Opción seleccionada:', selectedOption);
  }

  activateCustomer(customerId: number) {
    this.customerService.activateCustomer(customerId).subscribe(
      (response) => {
        alert("Se dio de baja al cliente")
        this.loadCustomers()
      },
      (error) => (
        console.log(error)
      )
    )
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId).subscribe(
      (response) => {
        alert("Se dio de alta al cliente")
        this.loadCustomers()
      },
      (error) => (
        console.log(error)
      )
    )
  }
}
