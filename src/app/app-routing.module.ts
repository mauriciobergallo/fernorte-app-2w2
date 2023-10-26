import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import * as Customer from './modules/customer/components/home/home.component';
import * as Inventory from './modules/inventory/components/home/home.component';
import * as Purchase from './modules/purchase/components/home/home.component';
import * as Sales from './modules/sales/components/home/home.component';
import { CatalogModule } from './modules/catalog/catalog.module';

const routes: Routes = [
  { path: 'catalog', loadChildren: () => CatalogModule },
  { path: 'customer', component: Customer.HomeComponent },
  { path: 'inventory', component: Inventory.HomeComponent },
  { path: 'purchase', component: Purchase.HomeComponent },
  { path: 'sales', component: Sales.HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
