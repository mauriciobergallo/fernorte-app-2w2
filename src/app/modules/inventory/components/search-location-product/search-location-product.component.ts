import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WarehouseService } from '../../services/warehouse-service/warehouse.service';
import { ILocationInfoProduct } from '../../models/ILocationInfoProduct';
import { NgForm } from '@angular/forms';

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
  
  productCodeOrName: String = '';
  findProduct: boolean = true;

  locationInfo : ILocationInfoProduct = {
    location_id: 0,
    category_name: "",
    product_name: "",
    capacityRemaining: undefined,
    measure_unit: "",
    max_capacity: undefined,
    location:{
      id:0,
      zone: "",
      section: "",
      space: ""
    }
}
  
  onSearch(form: NgForm) {

    this.subscripciones.add(
      this.warehouseService.getProductLocation(form.value.productCodeOrName).subscribe({
        next: (response: ILocationInfoProduct) => {
          if (response != null) {
            this.findProduct = true;
            this.locationInfo = response;
            this.locationInfo.capacityRemaining = (this.locationInfo?.max_capacity || 0) - (this.locationInfo?.quantity || 0);
          } else {
            this.findProduct = false;
          }
        },
        error: (error: Error) => {
          this.findProduct = false;
          console.log(error.message)
        },
      })
    );
    this.resetFields()

  }
  onInput(event: Event) {
    this.findProduct = true;
  }

  resetFields() {
    this.locationInfo.product_name = '';
    this.locationInfo.location.zone = '';
    this.locationInfo.location.section = '';
    this.locationInfo.location.space = '';
    this.locationInfo.max_capacity = undefined;
    this.locationInfo.capacityRemaining = undefined;
    this.locationInfo.measure_unit = '';
  }
}


