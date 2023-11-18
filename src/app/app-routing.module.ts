import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as Catalog from './modules/catalog/components/home/home.component';
import * as Customer from './modules/customer/components/home/home.component';
import * as Inventory from './modules/inventory/components/home/home.component';
import * as Purchase from './modules/purchase/components/home/home.component';
import * as Sales from './modules/sales/components/home/home.component';
import { FirstLoginComponent } from './modules/customer/components/first-login/first-login.component';
import { LoginComponent } from './modules/customer/components/login/login.component';
import { ForgotPasswordComponent } from './modules/customer/components/forgot-password/forgot-password.component';
import { TurnsComponentComponent } from './modules/customer/components/turns-component/turns-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'catalog', component: Catalog.HomeComponent },
  { path: 'customer', component: Customer.HomeComponent },
  { path: 'inventory', component: Inventory.HomeComponent },
  { path: 'purchase', component: Purchase.HomeComponent },
  { path: 'sales', component: Sales.HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: ':document-number/first-login/:true', component: FirstLoginComponent },
  { path: 'turns', component: TurnsComponentComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
