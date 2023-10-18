import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { SaleOrderProvider } from './providers/SaleOrderProvider';
import { ProductProvider } from './providers/productProvider';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';

@NgModule({
  declarations: [HomeComponent,SaleOrderComponent],
  providers: [SaleOrderProvider,ProductProvider],
  imports: [CommonModule],
  exports: [HomeComponent,SaleOrderComponent],
})
export class SalesModule {}
