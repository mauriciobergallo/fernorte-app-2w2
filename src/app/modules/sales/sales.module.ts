import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';

import { SaleOrderSearchListComponent } from './components/sale-order-search-list/sale-order-search-list.component';
import { SaleOrderProvider } from './services/salesOrder/SaleOrderProvider';
import { ProductProvider } from './services/products/productProvider';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { SaleOrderViewComponent } from './components/sale-order-view/sale-order-view.component';
import { CalcularTotalPipe } from './pipes/calcular-total.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { CaseConverterPipe } from './pipes/case-converter.pipe';
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
import { ReactiveFormsModule } from '@angular/forms';
import { TaxComponent } from './components/tax/tax.component';

import { ViewPaymentComponent } from './components/view-payment/view-payment.component';

import { BillingSearchListComponent } from './components/billing-search-list/billing-search-list.component';
import { BillingProvider } from './services/billing/BillingProvider';
import {ReportTabComponent} from "./components/report-tab/report-tab.component";



@NgModule({
  declarations: [HomeComponent,
    SaleOrderComponent,
    CalcularTotalPipe,
    CalcularImpuestosPipe,
    CalcularMontoTotalPipe,
    SaleOrderSearchListComponent,
    BillingComponent,
    PaymentMethodComponent,
    CreatePaymentComponent,
    SidenavComponent,
    PaymentMethodNavComponent,
    SaleOrderNavComponent,
    BillingNavComponent,
    ReportNavComponent,
    SaleOrderViewComponent,
    TranslateStatesPipe,
    TaxComponent,
    ReportNavComponent,
    ReportTabComponent,
    ViewPaymentComponent,

    BillingSearchListComponent,
    DateFormatPipe],


  providers: [SaleOrderProvider,
    ProductProvider,
    ClientProvider,
    TurnProvider,
    BillingProvider,
    CaseConverterPipe],

  imports: [CommonModule,
    FormsModule,
    RouterModule,
    RouterChildModule,
    ReactiveFormsModule,
  NgbModule],

  exports: [HomeComponent,
    SaleOrderComponent,
    CalcularTotalPipe,
    SaleOrderSearchListComponent,
    BillingComponent,
    ReportTabComponent,
    PaymentMethodComponent,
    CreatePaymentComponent,
    SidenavComponent,
    PaymentMethodNavComponent,
    SaleOrderNavComponent,
    BillingNavComponent,
    ReportNavComponent,
    SaleOrderViewComponent,
    TaxComponent,
    ReportNavComponent,
    ViewPaymentComponent,
    BillingSearchListComponent,
    DateFormatPipe],

})
export class SalesModule {}
