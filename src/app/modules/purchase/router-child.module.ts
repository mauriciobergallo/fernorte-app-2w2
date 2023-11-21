import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReportContainerComponent } from './components/report-container/report-container.component';
import { ListSuplierComponent } from './components/supplier/components/list-suplier/list-suplier.component';
import { PurchaseOrderContainerComponent } from './components/purchase-order-container/purchase-order-container.component';
import { PaymentOrderContainerComponent } from './components/payment-order-container/payment-order-container.component';
import { ClaimOrderContainerComponent } from './components/claim-order-container/claim-order-container.component';
import { ProductsSupplierComponent } from './components/supplier/components/products-supplier/products-supplier.component';
import { ListComponent } from './components/purchase-order-container/components/list/list.component';


const childRoutes: Routes = [
  {path: '', component: ReportContainerComponent},
  {path: 'report', component: ReportContainerComponent},
  {path: 'supplier', component: ListSuplierComponent},
  {path: 'supplier/products', component: ProductsSupplierComponent},
  {path: 'purchase-order', component: PurchaseOrderContainerComponent},
  {path: 'purchase-order-list', component: ListComponent},
  {path: 'payment-order', component: PaymentOrderContainerComponent},
  {path: 'claim-order', component: ClaimOrderContainerComponent}];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class RouterChildModule { }
