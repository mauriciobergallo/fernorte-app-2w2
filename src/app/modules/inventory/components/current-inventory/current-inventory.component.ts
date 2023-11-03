import { Component, OnDestroy, OnInit } from '@angular/core';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';
import { LocationInfoDto } from '../../models/location-info.interface';
import { computeStyles } from '@popperjs/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-current-inventory',
  templateUrl: './current-inventory.component.html',
  styleUrls: ['./current-inventory.component.css']
})
export class CurrentInventoryComponent implements OnInit, OnDestroy {

  locationInfoList: LocationInfoDto[] = [];
  private subscripciones = new Subscription();


  constructor(private warehouseService: WarehouseService) { }
  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();

  }

  ngOnInit(): void {
    this.fillTable();
  }




  
  private fillTable() {
    this.warehouseService.getLocationsInfo().subscribe({
      next: (resp) => {
        this.locationInfoList = resp;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
