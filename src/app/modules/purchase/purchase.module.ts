import { PurchaseClaimComponent } from './components/purchase/purchase-claim/purchase-claim.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ListSuplierComponent } from './components/supplier/list-suplier/list-suplier.component';
import { FormsModule } from '@angular/forms';

import {NgbDropdownMenu, NgbDropdownModule, NgbModule, NgbToastModule} from "@ng-bootstrap/ng-bootstrap"
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarPipe } from './components/supplier/pipes/buscar.pipe';
import { AddSupplierComponent } from './components/supplier/add-supplier/add-supplier.component';
import { ContactsComponent } from './components/supplier/contacts/contacts.component';
import { ProductsSupplierComponent } from './components/supplier/products-supplier/products-supplier.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PurchaseOrderComponent } from './components/purchase/purchase-order/purchase-order.component';


@NgModule({
  declarations: [HomeComponent, ListSuplierComponent, BuscarPipe, AddSupplierComponent, ContactsComponent, ProductsSupplierComponent, SidenavComponent, DashboardComponent, PurchaseOrderComponent, PurchaseClaimComponent, PurchaseClaimComponent],
  providers: [],
  imports: [CommonModule, FormsModule,NgbModule, NgbPaginationModule, NgbDropdownModule, NgbToastModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}
