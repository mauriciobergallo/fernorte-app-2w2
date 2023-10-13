import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';

@NgModule({
  declarations: [HomeComponent, SuppliersComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}
