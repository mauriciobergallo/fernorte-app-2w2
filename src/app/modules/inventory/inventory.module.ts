import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ReceptionOrdersComponent } from './components/reception-orders/reception-orders.component';
import { FormsModule } from '@angular/forms';
import { ConsultOrderComponent } from './components/consult-order/consult-order/consult-order.component';

@NgModule({
  declarations: [HomeComponent, ReceptionOrdersComponent, ConsultOrderComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
