import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { IMovementDto } from '../../models/IMovementDto';
import { MovementType } from '../../models/IMovementTypeEnum';
import { MovementsService } from '../../services/movements-service/movements.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'fn-search-inventory-movements',
  templateUrl: './search-inventory-movements.component.html',
  styleUrls: ['./search-inventory-movements.component.css']
})
export class SearchInventoryMovementsComponent implements OnInit, OnDestroy {
  movimientosOriginales: IMovementDto[] = [];
  movimientos: IMovementDto[] = [];
  isLoading: boolean = false;
  private subscripciones = new Subscription();

  currentPage = 1;
  totalPages = 1;

  mostrarDetalleMovimiento: number | null = null;
  mostrarDetalle: boolean = false;

  showDetail(i: number){
    if(i === this.mostrarDetalleMovimiento) {
      this.mostrarDetalle = false;
      this.mostrarDetalleMovimiento = null;
      return;
    }
    this.mostrarDetalle=true;
    this.mostrarDetalleMovimiento = i;
  }

  getMovementTypeTranslate(mov : MovementType | null): string  {
    if(mov == null) return '-'
    if(mov == MovementType.INBOUND) return 'Entrada'
    if(mov == MovementType.OUTBOUND) return 'Salida'
    return '-'
  }

  orderDetail(idx: number){
    //this.movimientos[idx].movement_details.
  }

  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  constructor(private movementService: MovementsService) {

  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getMovementsPage(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMovementsPage(this.currentPage);

    }
  }
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  ngOnInit() {
    this.getMovementsPage(this.currentPage);

    //this.fillTable();
  }

  filterByDate(event: { from: NgbDate | null; to: NgbDate | null }) {

    if (event.from && event.to) {

      let fromDate = new Date(event.from.year, event.from.month - 1, event.from.day);
      let toDate = new Date(event.to.year, event.to.month - 1, event.to.day);

      this.movimientos = this.movimientosOriginales;
      this.movimientos = this.movimientos.filter((movement) => {

        let dateP = movement.date.split("-");

        let day = parseInt(dateP[0], 10);
        let month = parseInt(dateP[1], 10);
        let year = parseInt(dateP[2], 10);
        console.log(month)
        let movementDate = new Date(year, month - 1, day);

        return movementDate >= fromDate && movementDate <= toDate;
      });
      console.log(this.movimientos.toString() + "mov")
      console.log(this.movimientosOriginales.toString() + "movv Origins")
    } else {

    }
  }

  clearFilters() {
    this.movimientos = this.movimientosOriginales;
  }

  fillTable() {
    this.isLoading = true;
    this.subscripciones.add(
      this.movementService.getAllMovements().subscribe({
        next: (response: IMovementDto[]) => {
          if (response != null) {

            response.forEach(movement => {

              this.movimientosOriginales.push(movement)

            })
            this.movimientos = this.movimientosOriginales;
          } else {
            console.log('La respuesta está vacía');
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      })
    );
  }

  getMovementsPage(page: number) {
    this.isLoading = true;
    this.subscripciones.add(
      this.movementService.getPaginationMovements(this.currentPage - 1).subscribe({
        next: (response: Pagination) => {
          if (response != null) {
            response.items.forEach(movement => {
              this.movimientosOriginales.push(new IMovementDto(movement))
            })
            this.movimientos = this.movimientosOriginales;
    this.isLoading = false;
          } else {
            console.log("No content")
          }
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    )

    // Simula una espera
   // timer(3000).subscribe(() => {
      this.isLoading = true;
     // this.movimientosOriginales = this.movimientosData;
     // this.movimientos = this.movimientosData;
   // });

  }

/*
  private movimientosData: IMovementDto[] = [
    {
      operator: 'John Doe',
      movement_type: null,
      is_internal: true,
      movement_details: [
        {
          location_origin: {
            id: 1,
            zone: 'Zone A',
            section: 'Section 1',
            space: 'Space X',
          },
          location_destination: {
            id: 2,
            zone: 'Zone B',
            section: 'Section 2',
            space: 'Space Y',
          },
          quantity: 10,
          product: 'Product A',
        },
        {
          location_origin: {
            id: 1,
            zone: 'Zone A',
            section: 'Section 1',
            space: 'Space X',
          },
          location_destination: {
            id: 2,
            zone: 'Zone B',
            section: 'Section 2',
            space: 'Space Y',
          },
          quantity: 100,
          product: 'Product A',
        },
        {
          location_origin: {
            id: 1,
            zone: 'Zone A',
            section: 'Section 1',
            space: 'Space X',
          },
          location_destination: {
            id: 2,
            zone: 'Zone B',
            section: 'Section 2',
            space: 'Space Y',
          },
          quantity: 5,
          product: 'Product A',
        }
      ],
      date: '08-11-2023 23:07:11',
    },
    {
      operator: 'Jane Smith',
      movement_type: null,
      is_internal: true,
      movement_details: [
        {
          location_origin: {
            id: 3,
            zone: 'Zone C',
            section: 'Section 3',
            space: 'Space Z',
          },
          location_destination: null,
          quantity: 5,
          product: 'Product B',
        },
      ],
      date: '10-11-2023 15:30:45',
    },
    {
      operator: 'Alice Johnson',
      movement_type: MovementType.INBOUND,
      is_internal: false,
      movement_details: [
        {
          location_origin: null,
          location_destination: {
            id: 4,
            zone: 'Zone D',
            section: 'Section 4',
            space: 'Space W',
          },
          quantity: 8,
          product: 'Product C',
        },
      ],
      date: '12-11-2023 09:15:20',
    },
    {
      operator: 'Pepe',
      movement_type: MovementType.OUTBOUND,
      is_internal: false,
      movement_details: [
        {
          location_destination: null,
          location_origin: {
            id: 4,
            zone: 'Zone D',
            section: 'Section 4',
            space: 'Space W',
          },
          quantity: 8,
          product: 'Product C',
        },
      ],
      date: '12-11-2023 09:15:20',
    }
  ];
*/
}
