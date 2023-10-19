import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { SaleOrderProvider } from './providers/SaleOrderProvider';
import { ProductProvider } from './providers/productProvider';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { FormsModule } from '@angular/forms';
import { CalcularTotalPipe } from './pipes/calcular-total.pipe';
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';

@NgModule({
  declarations: [HomeComponent,SaleOrderComponent, CalcularTotalPipe, CreatePaymentComponent, ViewPaymentComponent],
  providers: [SaleOrderProvider,ProductProvider],
  imports: [CommonModule,FormsModule],
  exports: [HomeComponent,SaleOrderComponent],
})
export class SalesModule {}
