import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ReceptionOrdersComponent } from './components/reception-orders/reception-orders.component';

import { SearchLocationProductComponent } from './components/search-location-product/search-location-product.component';
import { SearchInventoryMovementsComponent } from './components/search-inventory-movements/search-inventory-movements.component';
import { DatepickerRangePopupComponent } from './components/datepicker-range-popup/datepicker-range-popup.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import {InventoryRoutingModule} from './inventory-routing.module';
import { SearchStorageTicketComponent } from './components/search-storage-ticket/search-storage-ticket.component';
import { CurrentInventoryComponent } from './components/current-inventory/current-inventory.component';

@NgModule({
  declarations: [HomeComponent,CurrentInventoryComponent , ReceptionOrdersComponent, SearchLocationProductComponent, SearchInventoryMovementsComponent, DatepickerRangePopupComponent, SearchStorageTicketComponent],
  providers: [],
  imports: [CommonModule,FormsModule,HttpClientModule,NgbDatepickerModule,InventoryRoutingModule],
  exports: [HomeComponent]
})
export class InventaryModule {}
