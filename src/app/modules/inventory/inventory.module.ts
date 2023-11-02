import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RegisterTicketComponent } from './components/register-ticket/register-ticket.component';
import { AddProductTicketComponent } from './components/add-product-ticket/add-product-ticket.component';
import { ListProductTicketComponent } from './components/list-product-ticket/list-product-ticket.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, RegisterTicketComponent, AddProductTicketComponent, ListProductTicketComponent],
  providers: [],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
