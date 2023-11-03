import { Component, OnInit } from '@angular/core';
import { CurrentInventoryService } from '../../services/current-inventory.service';
import { LocationInfoDto } from '../../models/location-info.interface';
import { computeStyles } from '@popperjs/core';

@Component({
  selector: 'fn-current-inventory',
  templateUrl: './current-inventory.component.html',
  styleUrls: ['./current-inventory.component.css']
})
export class CurrentInventoryComponent implements OnInit {

  locationInfoList: LocationInfoDto[] = [];

  constructor(private currentInventoryService: CurrentInventoryService) { }

  ngOnInit(): void {
    this.fillTable();
  }




  
  private fillTable() {
    this.currentInventoryService.getLocationsInfo().subscribe({
      next: (resp) => {
        this.locationInfoList = resp;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
