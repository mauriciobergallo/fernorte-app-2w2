import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReportContainerComponent } from './components/report-container/report-container.component';
import { ListSuplierComponent } from './components/supplier/list-suplier/list-suplier.component';
import { PurchaseOrderContainerComponent } from './components/purchase-order-container/purchase-order-container.component';
import { PaymentOrderContainerComponent } from './components/payment-order-container/payment-order-container.component';
import { ClaimOrderContainerComponent } from './components/claim-order-container/claim-order-container.component';


const childRoutes: Routes = [
  {path: '', component: ReportContainerComponent},
  {path: 'report', component: ReportContainerComponent},
  {path: 'supplier', component: ListSuplierComponent},
  {path: 'purchase-order', component: PurchaseOrderContainerComponent},
  {path: 'payment-order', component: PaymentOrderContainerComponent},
  {path: 'claim-order', component: ClaimOrderContainerComponent}];


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports:[RouterModule]
})
export class RouterChildModule { }
