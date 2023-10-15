import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { SaleOrderProvider } from './providers/SaleOrderProvider';
import { ProductProvider } from './providers/productProvider';

@NgModule({
  declarations: [HomeComponent],
  providers: [SaleOrderProvider,ProductProvider],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class SalesModule {}
