import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';

import { SaleOrderSearchListComponent } from './components/sale-order-search-list/sale-order-search-list.component';
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
import { RouterModule } from '@angular/router';
import { RouterChildModule } from './router-child.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PaymentMethodNavComponent } from './components/payment-method-nav/payment-method-nav.component';
import { SaleOrderNavComponent } from './components/sale-order-nav/sale-order-nav.component';
import { BillingNavComponent } from './components/billing-nav/billing-nav.component';
import { ReportNavComponent } from './components/report-nav/report-nav.component';
import { TranslateStatesPipe } from './pipes/translateStates.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxComponent } from './components/tax/tax.component';
import { PriceFormatPipe} from './pipes/price-format.pipe';
import { TaxNavComponent } from './components/tax-nav/tax-nav.component';

import { ViewPaymentComponent } from './components/view-payment/view-payment.component';

import { BillingSearchListComponent } from './components/billing-search-list/billing-search-list.component';
import { TaxRegisterComponent } from './components/tax-register/tax-register.component';
import { PaymentMethodRegisterComponent } from './components/payment-method-register/payment-method-register.component';
import { DateFormat2Pipe } from './pipes/date-format2.pipe';
import { SpinnerComponent } from './components/spinner/viewspinner/spinner.component';
import { PaymentMethodDeletedComponent } from './components/payment-method-deleted/payment-method-deleted.component';
import { ReportTabComponent } from './components/report-tab/report-tab.component';



@NgModule({
  declarations: [HomeComponent,
    SaleOrderComponent,
    CalcularTotalPipe,
    CalcularImpuestosPipe,
    CalcularMontoTotalPipe,
    SaleOrderSearchListComponent,
    BillingComponent,
    PaymentMethodComponent,
    PaymentMethodRegisterComponent,
    PaymentMethodDeletedComponent,
    CreatePaymentComponent,
    SidenavComponent,
    PaymentMethodNavComponent,
    SaleOrderNavComponent,
    BillingNavComponent,
    ReportNavComponent,
    SaleOrderViewComponent,
    TranslateStatesPipe,
    TaxComponent,
    TaxNavComponent,
    TaxRegisterComponent,
    ReportNavComponent,
    ReportNavComponent,
    ViewPaymentComponent,
    BillingSearchListComponent,
    DateFormatPipe,
    PriceFormatPipe,
    DateFormat2Pipe,
    CaseConverterPipe,
    SpinnerComponent,
    PaymentMethodDeletedComponent,
    ReportTabComponent
    ],


  providers: [CaseConverterPipe],

  imports: [CommonModule,
    FormsModule,
    RouterModule,
    RouterChildModule,
    ReactiveFormsModule],

  exports: [HomeComponent,
    SaleOrderComponent,
    CalcularTotalPipe,
    SaleOrderSearchListComponent,
    BillingComponent,
    PaymentMethodComponent,
    PaymentMethodRegisterComponent,
    PaymentMethodDeletedComponent,
    CreatePaymentComponent,
    SidenavComponent,
    PaymentMethodNavComponent,
    SaleOrderNavComponent,
    BillingNavComponent,
    ReportNavComponent,
    SaleOrderViewComponent,
    TaxComponent,
    TaxNavComponent,
    TaxRegisterComponent,
    ReportNavComponent,
    ReportNavComponent,
    ViewPaymentComponent,
    BillingSearchListComponent,
    DateFormatPipe,
    PriceFormatPipe,
    DateFormat2Pipe,
    CaseConverterPipe,
  SpinnerComponent,
PaymentMethodDeletedComponent,
ReportTabComponent],

})
export class SalesModule {}
