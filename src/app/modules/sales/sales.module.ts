import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';

import { SaleOrderSearchHandlerComponent } from './components/sale-order-search-handler/sale-order-search-handler.component';
import { SaleOrderSearchFilterComponent } from './components/sale-order-search-filter/sale-order-search-filter.component';
import { SaleOrderSearchListComponent } from './components/sale-order-search-list/sale-order-search-list.component';
import { SaleOrderProvider } from './services/salesOrder/SaleOrderProvider';
import { ProductProvider } from './services/products/productProvider';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { CalcularTotalPipe } from './pipes/calcular-total.pipe';
import { CalcularImpuestosPipe } from './pipes/calcular-impuestos.pipe';
import { CalcularMontoTotalPipe } from './pipes/calcular-monto-total.pipe';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { CreatePaymentComponent } from './components/create-payment/create-payment.component';
import { ClientProvider } from './services/clients/clientProvider';
import { RouterModule } from '@angular/router';
import { RouterChildModule } from './router-child.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PaymentMethodNavComponent } from './components/payment-method-nav/payment-method-nav.component';
import { SaleOrderNavComponent } from './components/sale-order-nav/sale-order-nav.component';
import { BillingNavComponent } from './components/billing-nav/billing-nav.component';
import { ReportNavComponent } from './components/report-nav/report-nav.component';
import { TurnProvider } from './services/turns/TurnProvider';
import { TranslateStatesPipe } from './pipes/translateStates.pipe';

@NgModule({
  declarations: [HomeComponent,
    SaleOrderComponent, 
    CalcularTotalPipe, 
    CalcularImpuestosPipe, 
    CalcularMontoTotalPipe, 
    SaleOrderSearchHandlerComponent,
    SaleOrderSearchFilterComponent, 
    SaleOrderSearchListComponent, 
    BillingComponent, 
    PaymentMethodComponent,
    CreatePaymentComponent,
    SidenavComponent,
    PaymentMethodNavComponent,
    SaleOrderNavComponent,
    BillingNavComponent,
    ReportNavComponent,
    TranslateStatesPipe],

  providers: [SaleOrderProvider,
    ProductProvider,
    ClientProvider,
    TurnProvider],

  imports: [CommonModule,
    FormsModule, 
    RouterModule, 
    RouterChildModule],

  exports: [HomeComponent,
    SaleOrderComponent, 
    CalcularTotalPipe, 
    SaleOrderSearchHandlerComponent,
    SaleOrderSearchFilterComponent, 
    SaleOrderSearchListComponent, 
    BillingComponent, 
    PaymentMethodComponent,
    CreatePaymentComponent,
    SidenavComponent,
    PaymentMethodNavComponent,
    SaleOrderNavComponent,
    BillingNavComponent,
    ReportNavComponent],
})
export class SalesModule {}
