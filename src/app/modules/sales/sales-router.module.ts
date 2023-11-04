import {NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { SaleOrderComponent } from './components/sale_order/sale-order.component';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [{
  path: '',
  component: SidenavComponent,
  loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
},{
  path: 'report',
  component: SaleOrderComponent,
  loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
},{
  path: 'sale-order',
  component: SaleOrderComponent,
  loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
},{
  path: 'billing',
  component: BillingComponent,
  loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
},{
  path: 'payment-method',
  component: PaymentMethodComponent,
  loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SalesRoutingModule { }
