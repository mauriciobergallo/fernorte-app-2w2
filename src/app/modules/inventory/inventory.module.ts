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

import { InventoryRoutingModule } from './inventory-routing.module';
import { SearchStorageTicketComponent } from './components/search-storage-ticket/search-storage-ticket.component';
import { CurrentInventoryComponent } from './components/current-inventory/current-inventory.component';
import { ConsultOrderComponent } from './components/consult-order/consult-order/consult-order.component';

import { StateIconPipePipe } from './pipes/state-icon-pipe.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryOrderDetailsComponent } from './components/consult-order/delivery-order-details/delivery-order-details.component';

import { ConsultReceptionOrdersComponent } from './components/consult-reception-orders/consult-reception-orders.component';


@NgModule({
  declarations: [
    HomeComponent,
    CurrentInventoryComponent,
    ReceptionOrdersComponent,
    SearchLocationProductComponent,
    SearchInventoryMovementsComponent,
    DatepickerRangePopupComponent,
    SearchStorageTicketComponent,
    ConsultOrderComponent,
    StateIconPipePipe,
    DeliveryOrderDetailsComponent,
    ConsultReceptionOrdersComponent,
  ],

  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbDatepickerModule,
    InventoryRoutingModule,
    NgbModule
  ],
  exports: [HomeComponent],
})
export class InventaryModule {}
