import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ReceptionOrdersComponent } from './components/reception-orders/reception-orders.component';
import { FormsModule } from '@angular/forms';
import { CurrentInventoryComponent } from './components/current-inventory/current-inventory.component';

@NgModule({
  declarations: [HomeComponent, ReceptionOrdersComponent, CurrentInventoryComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent,CurrentInventoryComponent],
})
export class InventaryModule {}
