import {NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { ReportContainerComponent } from './components/report-container/report-container.component';

const routes: Routes = [{
  path: 'report',
  component: ReportContainerComponent,
  loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class PurchaseRoutingModule { }
