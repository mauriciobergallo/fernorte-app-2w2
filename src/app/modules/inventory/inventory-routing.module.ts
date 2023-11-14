import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchInventoryMovementsComponent } from './components/search-inventory-movements/search-inventory-movements.component';
import { SearchLocationProductComponent } from './components/search-location-product/search-location-product.component'


/*
const routes: Routes = [
  {
    path: '',
    children: [
      {path: '/movements', component: SearchInventoryMovementsComponent}
    ]
  }
];
*/
const routes: Routes = [
    { path: 'search-movements', component: SearchInventoryMovementsComponent },
    { path: 'locations-product', component: SearchLocationProductComponent },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }