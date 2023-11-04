import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


const childRoutes: Routes = [
  {path: '', component: SidenavComponent},
  {path: 'report', component: SaleOrderComponent},
  {path: 'sale-order', component: SaleOrderComponent},
  {path: 'billing', component: BillingComponent},
  {path: 'payment-method', component: PaymentMethodComponent},
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class RouterChildModule { }
