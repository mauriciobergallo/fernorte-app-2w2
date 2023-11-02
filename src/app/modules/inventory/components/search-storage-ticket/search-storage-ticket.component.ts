import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageTicket } from '../../models/StorageTicket.interface';
import { Subscription } from 'rxjs';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';

@Component({
  selector: 'fn-search-storage-ticket',
  templateUrl: './search-storage-ticket.component.html',
  styleUrls: ['./search-storage-ticket.component.css']
})
export class SearchStorageTicketComponent implements OnInit, OnDestroy {
 
  private subscriptions = new Subscription
  storageTickets: StorageTicket[] = [];
  ticketDetail: StorageTicket = {
    ticket_id: 0,
    created_at: "",
    product_name: "",
    location: {
      id: 1,
      zone: "",
      section: "",
      space: ''
    },
    quantity: 1,
    measure_unit: "",
    created_by: "",
    operator_name: "",
    remarks: "",
    state: ""
  }

  constructor(private warehouseService: WarehouseService) { }


  ngOnInit(): void {
    //this.fillTable();
    this.storageTickets = this.data;
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }

  fillTable() {
    this.warehouseService.getStorageTickets().subscribe({
      next: (resp) => {
        this.storageTickets = resp;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  data: StorageTicket[] = [
    {
      ticket_id: 1,
      created_at: "01-01-2023 12:00:00",
      product_name: "Product A",
      location: {
        id: 1,
        zone: "DEPOSITO",
        section: "PASILLO",
        space: '134'
      },
      quantity: 10.5,
      measure_unit: "kilograms",
      created_by: "",
      operator_name: "",
      remarks: "Additional remarks for Ticket 1",
      state: ""
    },
    {
      ticket_id: 2,
      created_at: "02-01-2023 13:30:00",
      product_name: "Product B",
      location: {
        id: 2,
        zone: "WAREHOUSE",
        section: "STORAGE",
        space: '205'
      },
      quantity: 7.8,
      measure_unit: "units",
      created_by: "",
      operator_name: "",
      remarks: "Additional remarks for Ticket 2",
      state: ""
    },
    {
      ticket_id: 3,
      created_at: "03-01-2023 14:45:00",
      product_name: "Product C",
      location: {
        id: 3,
        zone: "DEPOT",
        section: "AISLE",
        space: "310"
      },
      quantity: 15.2,
      measure_unit: "kilograms",
      created_by: "",
      operator_name: "",
      remarks: "Additional remarks for Ticket 3",
      state: ""
    }
  ]

}

