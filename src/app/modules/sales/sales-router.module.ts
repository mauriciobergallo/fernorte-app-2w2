import {NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '', 
        loadChildren: () => import('./router-child.module').then(m => m.RouterChildModule)
      }
      // Aquí podrían agregarse más rutas hijas si es necesario
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SalesRoutingModule { }
