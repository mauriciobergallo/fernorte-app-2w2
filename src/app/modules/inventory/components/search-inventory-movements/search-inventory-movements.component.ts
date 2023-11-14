import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMovementDto } from '../../models/IMovementDto';
import { MovementType } from '../../models/IMovementTypeEnum';
import { MovementsService } from '../../services/movements-service/movements.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fn-search-inventory-movements',
  templateUrl: './search-inventory-movements.component.html',
  styleUrls: ['./search-inventory-movements.component.css']
})
export class SearchInventoryMovementsComponent implements OnInit, OnDestroy {
  movimientosOriginales: IMovementDto[] = [];
  movimientos: IMovementDto[] = [];
  isLoading: boolean=false;
  private subscripciones = new Subscription();


  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();
  }

  constructor(private movementService: MovementsService) {
   
  }

  ngOnInit() {
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

  filterByDate(event: { from: NgbDate | null; to: NgbDate | null}) {

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
      let movementDate = new Date(year,month-1,day);
  
        return movementDate >= fromDate && movementDate <= toDate;
      });
      console.log(this.movimientos.toString()+ "mov")
      console.log(this.movimientosOriginales.toString()+ "movv Origins")
    } else {    
    
    }    
  }

  clearFilters() {
    this.movimientos = this.movimientosOriginales; 
  }
}
    /*
    this.movimientos = [
      {
        operator: 'John Doe',
        movementType: MovementType.Outbound,
        isInternal: true,
        date: 'asd',
        detailsMovementDtos: [
          {
            locationOrigin: { zone: 'A', section: '1', space: 'DE4' },
            locationDestination: { zone: 'B', section: '2', space: 'AB3' },
            quantity: 80,
            product: 'Destornillador',
          },
          {
            locationOrigin: { zone: 'A', section: '1', space: 'DE4' },
            locationDestination: { zone: 'B', section: '2', space: 'AB3' },
            quantity: 120,
            product: 'Clavos',
          },
        ],
      },
      {
        operator: 'Jane Smith',
        movementType: MovementType.Inbound,
        isInternal: false,
        date: 'asd',
        detailsMovementDtos: [
          {
            locationOrigin: { zone: 'B', section: '3', space: 'BE9' },
            locationDestination: { zone: 'A', section: '2', space: 'AB4' },
            quantity: 5,
            product: 'Martillo',
          },
          {
            locationOrigin: { zone: 'E', section: '4', space: 'EE10' },
            locationDestination: { zone: 'F', section: '3', space: 'FF11' },
            quantity: 8,
            product: 'Llave inglesa',
          },
        ],
      },
    ];
    */