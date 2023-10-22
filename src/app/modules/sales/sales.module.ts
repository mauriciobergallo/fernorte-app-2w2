import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { SaleOrderProvider } from './services/SaleOrderProvider';
import { ProductProvider } from './services/productProvider';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { FormsModule } from '@angular/forms';
import { CalcularTotalPipe } from './pipes/calcular-total.pipe';
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';

@NgModule({
  declarations: [HomeComponent,SaleOrderComponent, CalcularTotalPipe, CreatePaymentComponent],
  providers: [SaleOrderProvider,ProductProvider],
  imports: [CommonModule,FormsModule],
  exports: [HomeComponent,SaleOrderComponent, CalcularTotalPipe, CreatePaymentComponent],
})
export class SalesModule {}
