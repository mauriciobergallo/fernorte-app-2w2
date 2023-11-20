import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PaymentMethodNavComponent } from './components/payment-method-nav/payment-method-nav.component';
import { SaleOrderNavComponent } from './components/sale-order-nav/sale-order-nav.component';
import { BillingNavComponent } from './components/billing-nav/billing-nav.component';
import { ReportNavComponent } from './components/report-nav/report-nav.component';
import { TaxComponent } from './components/tax/tax.component';
import { SaleOrderViewComponent } from './components/sale-order-view/sale-order-view.component';


const childRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'report', pathMatch: 'full' }, 
      { path: 'report', component: ReportNavComponent },
      { path: 'sale-order', component: SaleOrderNavComponent },
      { path: 'billing', component: BillingNavComponent },
      { path: 'payment-method', component: PaymentMethodNavComponent },
      { path: 'tax', component: TaxComponent}
    ],
  },
  { path: 'printOrder', component: SaleOrderViewComponent }
];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class RouterChildModule { }
