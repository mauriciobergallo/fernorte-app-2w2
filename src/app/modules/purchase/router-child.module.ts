import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReportContainerComponent } from './components/report-container/report-container.component';
import { PurchaseOrderContainerComponent } from './components/purchase-order-container/purchase-order-container.component';
import { PaymentOrderContainerComponent } from './components/payment-order-container/payment-order-container.component';
import { ClaimOrderContainerComponent } from './components/claim-order-container/claim-order-container.component';
import { ListComponent } from './components/purchase-order-container/components/list/list.component';
import { PaymentListComponent } from './components/payment-order-container/components/payment-list/payment-list.component';
import { ListSuplierComponent } from './components/supplier/list-suplier/list-suplier.component';
import { ProductsSupplierComponent } from './components/supplier/products-supplier/products-supplier.component';
import { FilterComponent } from './components/supplier/filter/filter.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

const childRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'report', component: ReportContainerComponent},
  {path: 'supplier', component: ListSuplierComponent},
  {path: 'supplier/products', component: ProductsSupplierComponent},
  {path: 'purchase-order', component: PurchaseOrderContainerComponent},
  {path: 'purchase-order-list', component: ListComponent},
  {path: 'payment-order', component: PaymentOrderContainerComponent},
  {path: 'payment-order-list', component: PaymentListComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'claim-order', component: ClaimOrderContainerComponent}];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class RouterChildModule { }
