import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';

import { SaleOrderSearchHandlerComponent } from './components/sale-order-search-handler/sale-order-search-handler.component';
import { SaleOrderSearchFilterComponent } from './components/sale-order-search-filter/sale-order-search-filter.component';
import { SaleOrderSearchListComponent } from './components/sale-order-search-list/sale-order-search-list.component';
import { SaleOrderProvider } from './providers/SaleOrderProvider';
import { ProductProvider } from './providers/productProvider';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { CalcularTotalPipe } from './pipes/calcular-total.pipe';
import { CalcularImpuestosPipe } from './pipes/calcular-impuestos.pipe';
import { CalcularMontoTotalPipe } from './pipes/calcular-monto-total.pipe';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';

@NgModule({
  declarations: [HomeComponent,SaleOrderComponent, CalcularTotalPipe, CalcularImpuestosPipe, CalcularMontoTotalPipe, SaleOrderSearchHandlerComponent,SaleOrderSearchFilterComponent,SaleOrderSearchListComponent, BillingComponent, PaymentMethodComponent,CreatePaymentComponent],
  providers: [SaleOrderProvider,ProductProvider],
  imports: [CommonModule,FormsModule],
  exports: [HomeComponent,SaleOrderComponent, CalcularTotalPipe, SaleOrderSearchHandlerComponent,SaleOrderSearchFilterComponent, SaleOrderSearchListComponent, BillingComponent, PaymentMethodComponent,CreatePaymentComponent],
})
export class SalesModule {}
