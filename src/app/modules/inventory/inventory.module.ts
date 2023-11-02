import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ReceptionOrdersComponent } from './components/reception-orders/reception-orders.component';
import { FormsModule } from '@angular/forms';
import { FormLocationComponent } from './components/form-location/form-location.component';

@NgModule({
  declarations: [HomeComponent, ReceptionOrdersComponent,FormLocationComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
