import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchInventoryMovementsComponent } from './components/search-inventory-movements/search-inventory-movements.component';
import { SearchLocationProductComponent } from './components/search-location-product/search-location-product.component'
import {ReceptionOrdersComponent} from './components/reception-orders/reception-orders.component'
import { SearchStorageTicketComponent } from './components/search-storage-ticket/search-storage-ticket.component';
import { CurrentInventoryComponent } from './components/current-inventory/current-inventory.component';
import { ConsultReceptionOrdersComponent } from './components/consult-reception-orders/consult-reception-orders.component';

/*
const routes: Routes = [
  {
    path: 'inventrory',
    children: [
      { path: 'search-movements', component: SearchInventoryMovementsComponent },
      { path: 'locations-product', component: SearchLocationProductComponent },
      { path: 'reception-orders', component: ReceptionOrdersComponent }
    ]
  }
];
  */

const routes: Routes = [
    { path: 'search-movements', component: SearchInventoryMovementsComponent },
    { path: 'locations-product', component: SearchLocationProductComponent },
    { path: 'reception-orders', component: ReceptionOrdersComponent },
    { path: 'storage-tickets', component: SearchStorageTicketComponent },
    { path: 'current-inventory', component: CurrentInventoryComponent },
    { path: 'consult-receptions', component: ConsultReceptionOrdersComponent}


  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }