import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WarehouseService } from '../../services/warehouse.service';
import { ILocationInfoProduct } from '../../models/ILocationInfoProduct';

@Component({
  selector: 'fn-search-location-product',
  templateUrl: './search-location-product.component.html',
  styleUrls: ['./search-location-product.component.css']
})
export class SearchLocationProductComponent implements OnInit, OnDestroy {

  constructor(private warehouseService: WarehouseService) { }
  private subscripciones = new Subscription();


  ngOnDestroy(): void {
    this.subscripciones.unsubscribe();

  }
  ngOnInit() { }

  productName: string = '';
  productCodeOrName: string = '';
  zone: string = '';
  section: string = '';
  space: string = '';
  capacityTotal?: number;
  capacityRemaining?: number;
  measureUnit: string = '';

  findProduct: boolean=true;

  onSearch() {
    this.resetFields()
    if(this.productCodeOrName == "" || this.productCodeOrName.length==0){
      this.findProduct=false;
      return;
    }
    this.subscripciones.add(
      this.warehouseService.getProductLocation(this.productCodeOrName).subscribe(
        (locationInfo: ILocationInfoProduct) => {
          if(locationInfo != null){
            this.findProduct = true;
            this.productName = locationInfo.productName;
            this.zone = locationInfo.location.zone; 
            this.section = locationInfo.location.section;
            this.space = locationInfo.location.space;
            this.capacityTotal = locationInfo.maxCapacity;
            this.capacityRemaining = locationInfo.maxCapacity - locationInfo.quantity;
            this.measureUnit = locationInfo.measureUnit;

          }else
          {
            this.findProduct=false;
          }


        },
        (error: any) => {
          console.error(error);
          this.findProduct=false;
        }
      )
    );

  }
  resetFields() {
    this.productName = '';
    this.zone = '';
    this.section = '';
    this.space = '';
    this.capacityTotal = undefined;
    this.capacityRemaining = undefined;
    this.measureUnit = '';
  }
}


