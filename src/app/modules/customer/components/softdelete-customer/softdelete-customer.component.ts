import { Component, OnInit } from '@angular/core';
import { CustomerActResponse } from '../../models/customer-response';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'fn-softdelete-customer',
  templateUrl: './softdelete-customer.component.html',
  styleUrls: ['./softdelete-customer.component.css']
})
export class SoftdeleteCustomerComponent implements OnInit {
  customers: CustomerActResponse[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe((data: CustomerActResponse[]) => {
      this.customers = data;
    });
    console.log(this.customers);
  }

  activateCustomer(customerId: number) {
    this.customerService.activateCustomer(customerId).subscribe(() => {
      this.loadCustomers();
    });
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId).subscribe(() => {
      this.loadCustomers();
    });
  }
}
