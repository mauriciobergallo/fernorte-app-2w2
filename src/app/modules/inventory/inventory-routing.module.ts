import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchInventoryMovementsComponent } from './components/search-inventory-movements/search-inventory-movements.component';
import { SearchLocationProductComponent } from './components/search-location-product/search-location-product.component';
import { SearchStorageTicketComponent } from './components/search-storage-ticket/search-storage-ticket.component';
import { CurrentInventoryComponent } from './components/current-inventory/current-inventory.component';
import { ConsultOrderComponent } from './components/consult-order/consult-order/consult-order.component';
import { DeliveryOrderDetailsComponent } from './components/consult-order/delivery-order-details/delivery-order-details.component';
import { ConsultReceptionOrdersComponent } from './components/consult-reception-orders/consult-reception-orders.component';
import { HomeComponent } from './components/home/home.component';

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
  {
    path: 'inventory',
    component: HomeComponent,
    children: [
      {
        path: 'search-movements',
        component: SearchInventoryMovementsComponent,
      },
      { path: 'locations-product', component: SearchLocationProductComponent },
      { path: 'storage-tickets', component: SearchStorageTicketComponent },
      { path: 'current-inventory', component: CurrentInventoryComponent },
      { path: 'orders', component: ConsultOrderComponent },
      {
        path: 'orders/:id/details',
        component: DeliveryOrderDetailsComponent,
      },
      { path: 'reception-orders', component: ConsultReceptionOrdersComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
