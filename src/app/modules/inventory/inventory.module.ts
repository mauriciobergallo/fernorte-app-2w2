import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SearchLocationProductComponent } from './components/search-location-product/search-location-product.component';
import { SearchInventoryMovementsComponent } from './components/search-inventory-movements/search-inventory-movements.component';
import { DatepickerRangePopupComponent } from './components/datepicker-range-popup/datepicker-range-popup.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { InventoryRoutingModule } from './inventory-routing.module';
import { SearchStorageTicketComponent } from './components/search-storage-ticket/search-storage-ticket.component';
import { CurrentInventoryComponent } from './components/current-inventory/current-inventory.component';
import { ConsultOrderComponent } from './components/consult-order/consult-order/consult-order.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StateIconPipePipe } from './pipes/state-icon-pipe.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryOrderDetailsComponent } from './components/consult-order/delivery-order-details/delivery-order-details.component';

import { RouterModule } from '@angular/router';
import { ReceptionOrderDetailsComponent } from './components/reception-order-details/reception-order-details.component';
import { CreateMovementComponent } from './components/create-movement/create-movement.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LocationComponent } from './components/location/location.component';
import { SectionsComponent } from './components/sections/sections.component';
import { SpaceComponent } from './components/space/space.component';



@NgModule({
  declarations: [
    HomeComponent,
    CurrentInventoryComponent,
    SearchLocationProductComponent,
    SearchInventoryMovementsComponent,
    DatepickerRangePopupComponent,
    SearchStorageTicketComponent,
    ConsultOrderComponent,
    SpinnerComponent,
    SidebarComponent,

    StateIconPipePipe,
    DeliveryOrderDetailsComponent,
    ReceptionOrderDetailsComponent,
    CreateMovementComponent,
    LocationComponent,
    SectionsComponent,
    SpaceComponent
    SpinnerComponent
  ],

  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbDatepickerModule,
    InventoryRoutingModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [HomeComponent],
})
export class InventaryModule {}
