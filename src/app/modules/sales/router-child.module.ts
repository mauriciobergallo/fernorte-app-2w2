import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { HomeComponent } from './components/home/home.component';
import { PaymentMethodNavComponent } from './components/payment-method-nav/payment-method-nav.component';


const childRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'report', pathMatch: 'full' }, 
      { path: 'report', component: SaleOrderComponent },
      { path: 'sale-order', component: SaleOrderComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'payment-method', component: PaymentMethodNavComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class RouterChildModule { }
