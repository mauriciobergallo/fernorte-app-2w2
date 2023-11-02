import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageTicket } from '../../models/StorageTicket.interface';
import { Subscription } from 'rxjs';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';
import { StorageTicketState } from '../../models/StorageTicketState.enum';
@Component({
  selector: 'fn-search-storage-ticket',
  templateUrl: './search-storage-ticket.component.html',
  styleUrls: ['./search-storage-ticket.component.css']
})
export class SearchStorageTicketComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription
  stateFinish: StorageTicketState = StorageTicketState.Finalizado;
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
    state: StorageTicketState.Pendiente
  }

  constructor(private warehouseService: WarehouseService) { }


  ngOnInit(): void {
    this.storageTickets = this.data;
    this.fillTable();
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

  asignTicket(ticket: StorageTicket) {
    //TODO: A travez del localstorage obtener id del operario logeado
    let operatorId;
    let randomId = Math.floor(Math.random() * 10) + 1;
    
    this.warehouseService.asignTicket(ticket.ticket_id,randomId).subscribe({
      next: (resp) => {
        //recargar tabla
        this.fillTable();
      },
      error: (error) => {
        console.log(error)
/*
        const index = this.storageTickets.findIndex(sTicket => sTicket.ticket_id === ticket.ticket_id);
      
        if (index !== -1) {
          this.storageTickets[index].operator_name = randomId.toString();

        }
        */
      }
    })
  }

  getStatusButtonContent(ticket: StorageTicket): string {
    switch (ticket.state){
      case StorageTicketState.Pendiente: return "Asignarme"
      case StorageTicketState.Asignado: return "Finalizar"
      case StorageTicketState.Finalizado: return "Completado"
      default: return "Asignarme"
    }
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
      state: StorageTicketState.Pendiente
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
      state: StorageTicketState.Pendiente
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
      state: StorageTicketState.Finalizado
    },
    {
      ticket_id: 4,
      created_at: "04-01-2023 10:15:00",
      product_name: "Product D",
      location: {
        id: 4,
        zone: "WAREHOUSE",
        section: "STORAGE",
        space: '123'
      },
      quantity: 8.7,
      measure_unit: "units",
      created_by: "",
      operator_name: "",
      remarks: "Additional remarks for Ticket 4",
      state: StorageTicketState.Asignado
    },
    {
      ticket_id: 5,
      created_at: "05-01-2023 15:20:00",
      product_name: "Product E",
      location: {
        id: 5,
        zone: "DEPOT",
        section: "AISLE",
        space: "210"
      },
      quantity: 12.3,
      measure_unit: "kilograms",
      created_by: "",
      operator_name: "",
      remarks: "Additional remarks for Ticket 5",
      state: StorageTicketState.Asignado
    },
    {
      ticket_id: 6,
      created_at: "06-01-2023 16:30:00",
      product_name: "Product F",
      location: {
        id: 6,
        zone: "WAREHOUSE",
        section: "STORAGE",
        space: '305'
      },
      quantity: 9.4,
      measure_unit: "units",
      created_by: "",
      operator_name: "",
      remarks: "Additional remarks for Ticket 6",
      state: StorageTicketState.Finalizado
    }
  ];
  

}

