import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ListSuplierComponent } from './components/list-suplier/list-suplier.component';
import { FormsModule } from '@angular/forms';

import {NgbDropdownMenu, NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap"
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarPipe } from './components/pipes/buscar.pipe';
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProductsSupplierComponent } from './components/products-supplier/products-supplier.component'

@NgModule({
  declarations: [HomeComponent, ListSuplierComponent, BuscarPipe, AddSupplierComponent, ContactsComponent, ProductsSupplierComponent],
  providers: [],
  imports: [CommonModule, FormsModule,NgbModule, NgbPaginationModule, NgbDropdownModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}