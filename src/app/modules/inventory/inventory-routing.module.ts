import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchInventoryMovementsComponent } from './components/search-inventory-movements/search-inventory-movements.component';
import { SearchLocationProductComponent } from './components/search-location-product/search-location-product.component';
import { SearchStorageTicketComponent } from './components/search-storage-ticket/search-storage-ticket.component';
import { CurrentInventoryComponent } from './components/current-inventory/current-inventory.component';
import { ConsultOrderComponent } from './components/consult-order/consult-order/consult-order.component';
import { DeliveryOrderDetailsComponent } from './components/consult-order/delivery-order-details/delivery-order-details.component';
import { HomeComponent } from './components/home/home.component';
import { ReceptionOrderDetailsComponent } from './components/reception-order-details/reception-order-details.component';
import { CreateMovementComponent } from './components/create-movement/create-movement.component';
import { LocationComponent } from './components/location/location.component';
import { SectionsComponent } from './components/sections/sections.component';
import { SpaceComponent } from './components/space/space.component';

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
      { path: 'new-movement', component: CreateMovementComponent },
      { path: 'storage-tickets', component: SearchStorageTicketComponent },
      { path: 'current-inventory', component: CurrentInventoryComponent },
      { path: 'locations',
          children: [
            { path: '', component: LocationComponent },
            {
              path: ':id/section',
              children:
              [
                {path: '', component: SectionsComponent},
                {path: ':sectionId/spaces', component: SpaceComponent},
              ]
            },
      ],
      },
      {
        path: 'orders',
        children: [
          { path: '', component: ConsultOrderComponent },
          {
            path: ':id/details',
            component: DeliveryOrderDetailsComponent,
          },
        ],
      },
      
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
