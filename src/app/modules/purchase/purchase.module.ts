import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ListSuplierComponent } from './components/supplier/list-suplier/list-suplier.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import {NgbDropdownMenu, NgbDropdownModule, NgbModalModule, NgbModule, NgbToastModule} from "@ng-bootstrap/ng-bootstrap"
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarPipe } from './components/supplier/pipes/buscar.pipe';
import { AddSupplierComponent } from './components/supplier/add-supplier/add-supplier.component';
import { ContactsComponent } from './components/supplier/contacts/contacts.component';
import { ProductsSupplierComponent } from './components/supplier/products-supplier/products-supplier.component';
import { SidenavComponent } from './components/shared/sidenav/sidenav.component';

import { PurchaseOrderContainerComponent } from './components/purchase-order-container/purchase-order-container.component';
import { PaymentOrderContainerComponent } from './components/payment-order-container/payment-order-container.component';
import { ClaimOrderContainerComponent } from './components/claim-order-container/claim-order-container.component';
import { ReportContainerComponent } from './components/report-container/report-container.component';
import { CartComponent } from './components/purchase-order-container/components/cart/cart.component';
import { ProductCardComponent } from './components/purchase-order-container/components/product-card/product-card.component';
import { PreviewComponent } from './components/purchase-order-container/components/preview/preview.component';
import { PaymentOrderGridComponent } from './components/payment-order-container/components/payment-order-grid/payment-order-grid.component';
import { TotalSidebarComponent } from './components/payment-order-container/components/total-sidebar/total-sidebar.component';
import { PaymentMethodComponent } from './components/payment-order-container/components/payment-method/payment-method.component';
import { TotalResumeComponent } from './components/payment-order-container/components/total-resume/total-resume.component';
import { HedearSupplierComponent } from './components/shared/hedear-supplier/hedear-supplier.component';
import { OrderButtonsComponent } from './components/shared/order-buttons/order-buttons.component';
import { RouterModule } from '@angular/router';

import { RouterChildModule } from './router-child.module';
import { AddProductModalComponent } from './components/supplier/add-product-modal/add-product-modal.component';


@NgModule({
  declarations: [HomeComponent, ListSuplierComponent, BuscarPipe, AddSupplierComponent, ContactsComponent, ProductsSupplierComponent, SidenavComponent, PurchaseOrderContainerComponent, PaymentOrderContainerComponent, ClaimOrderContainerComponent, ReportContainerComponent, CartComponent, ProductCardComponent, PreviewComponent, PaymentOrderGridComponent, TotalSidebarComponent, PaymentMethodComponent, TotalResumeComponent, HedearSupplierComponent, OrderButtonsComponent, AddProductModalComponent],
  providers: [],
  imports: [CommonModule, FormsModule,NgbModule, NgbPaginationModule, NgbDropdownModule, NgbToastModule,RouterModule, RouterChildModule, NgbModalModule, SweetAlert2Module.forRoot({
    provideSwal: () => import('sweetalert2').then(({ default: swal }) => swal.mixin({
      // example: set global options here
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`
    }))
  })],
  exports: [HomeComponent],
})
export class PurchaseModule {}
