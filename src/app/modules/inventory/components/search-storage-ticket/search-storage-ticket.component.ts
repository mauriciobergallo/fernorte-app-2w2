import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageTicket } from '../../models/StorageTicket.interface';
import { Subscription } from 'rxjs';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';
import { StorageTicketState } from '../../models/StorageTicketState.enum';
@Component({
  selector: 'fn-search-storage-ticket',
  templateUrl: './search-storage-ticket.component.html',
  styleUrls: ['./search-storage-ticket.component.css'],
})
export class SearchStorageTicketComponent implements OnInit, OnDestroy {
  actualTicket: StorageTicket | undefined;
  private subscriptions = new Subscription();
  stateFinish: StorageTicketState = StorageTicketState.FINALIZED;
  storageTickets: StorageTicket[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  loading: boolean = false;
  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    const authData = {
      username: 'ftahan',
      roles: ['OPERADOR'],
    };
    localStorage.setItem('auth-data', JSON.stringify(authData));
    this.fillTable();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fillTable() {
    this.loading = true;
    this.warehouseService.getStorageTickets().subscribe({
      next: (resp: StorageTicket[]) => {
        this.storageTickets = resp;
        console.log(this.storageTickets);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        console.log('eeeeeeoo');
      },
    });
  }

  asignTicket(event: any) {
    let operatorUsername = JSON.parse(
      localStorage.getItem('auth-data') || ''
    ).username;

    this.warehouseService
      .asignTicket(event.target.value, operatorUsername)
      .subscribe({
        next: (resp) => {
          //recargar tabla
          console.log(resp);
          this.fillTable();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getStatusButtonContent(ticket: string): string {
    switch (ticket) {
      case 'PENDING':
        return 'Asignarme';
      case 'ASSIGNED':
        return 'Finalizar';
      case 'FINALIZED':
        return 'Completado';
      default:
        return '';
    }
  }
  showDetails(ticketIndex: number) {
    this.actualTicket = this.storageTickets.at(ticketIndex);
  }
  stateSpanishTranslate(state: string) {
    switch (state) {
      case 'PENDING':
        return 'Pendiente';
      case 'ASSIGNED':
        return 'Asignado';
      case 'FINALIZED':
        return 'Completado';
      default:
        return '';
    }
  }
  previousPage() {}
  nextPage() {}

  /*
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
  */
}
