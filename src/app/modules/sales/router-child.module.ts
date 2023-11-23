import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PaymentMethodNavComponent } from './components/payment-method-nav/payment-method-nav.component';
import { SaleOrderNavComponent } from './components/sale-order-nav/sale-order-nav.component';
import { BillingNavComponent } from './components/billing-nav/billing-nav.component';
import { ReportNavComponent } from './components/report-nav/report-nav.component';
import { TaxComponent } from './components/tax/tax.component';
import { TaxNavComponent } from './components/tax-nav/tax-nav.component';
import { SaleOrderSearchListComponent } from './components/sale-order-search-list/sale-order-search-list.component';
import { SaleOrderViewComponent } from './components/sale-order-view/sale-order-view.component';
import { BillingSearchListComponent } from './components/billing-search-list/billing-search-list.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


const childRoutes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' }, 
      { path: 'report', component: ReportNavComponent},
      { path: 'sale-order', component: SaleOrderNavComponent, children: [
        {path: 'list', component: SaleOrderSearchListComponent},
        {path: 'regist', component: SaleOrderComponent}
      ]  },
      { path: 'billing', component: BillingNavComponent , children: [
        {path: 'listB', component: BillingSearchListComponent}
      ]  },
      { path: 'payment-method', component: PaymentMethodNavComponent },
      { path: 'tax', component: TaxNavComponent}
    ],
  },
  {path: 'printOrder', component: SaleOrderViewComponent},
  {path: 'printBill', component: ViewPaymentComponent},
];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class RouterChildModule { }
