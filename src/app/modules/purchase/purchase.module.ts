import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { ListSuplierComponent } from './components/supplier/components/list-suplier/list-suplier.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbDropdownMenu, NgbDropdownModule, NgbModalModule, NgbModule, NgbToastModule} from "@ng-bootstrap/ng-bootstrap"
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarPipe } from './components/supplier/pipes/buscar.pipe';
import { AddSupplierComponent } from './components/supplier/components/add-supplier/add-supplier.component';
import { ContactsComponent } from './components/supplier/components/contacts/contacts.component';
import { ProductsSupplierComponent } from './components/supplier/components/products-supplier/products-supplier.component';
import { SidenavComponent } from './components/shared/sidenav/sidenav.component';

import { PurchaseOrderContainerComponent } from './components/purchase-order-container/purchase-order-container.component';
import { PaymentOrderContainerComponent } from './components/payment-order-container/payment-order-container.component';
import { ClaimOrderContainerComponent } from './components/claim-order-container/claim-order-container.component';
import { ReportContainerComponent } from './components/report-container/report-container.component';
import { CartComponent } from './components/purchase-order-container/components/cart/cart.component';
import { ProductCardComponent } from './components/purchase-order-container/components/product-card/product-card.component';
import { PreviewComponent } from './components/purchase-order-container/components/preview/preview.component';
import { PaymentOrderGridComponent } from './components/payment-order-container/components/payment-order-grid/payment-order-grid.component';
import { PaymentMethodComponent } from './components/payment-order-container/components/payment-method/payment-method.component';
import { TotalResumeComponent } from './components/payment-order-container/components/total-resume/total-resume.component';
import { HedearSupplierComponent } from './components/shared/hedear-supplier/hedear-supplier.component';
import { OrderButtonsComponent } from './components/shared/order-buttons/order-buttons.component';
import { PaymentPreviewComponent } from './components/payment-order-container/components/payment-preview/payment-preview.component';
import { RouterModule } from '@angular/router';

import { RouterChildModule } from './router-child.module';
import { AddProductModalComponent } from './components/supplier/components/add-product-modal/add-product-modal.component';
import { ListComponent } from './components/purchase-order-container/components/list/list.component';
import { ReportsScreenComponent } from './components/report-container/components/reports-screen/reports-screen.component';
import { DatePickerComponent } from './components/report-container/components/date-picker/date-picker.component';
import { OrdersGridComponent } from './components/report-container/components/orders-grid/orders-grid.component';
import { PaymentListComponent } from './components/payment-order-container/components/payment-list/payment-list.component';



@NgModule({
  declarations: [ListComponent, HomeComponent, ListSuplierComponent, BuscarPipe, AddSupplierComponent, ContactsComponent, ProductsSupplierComponent, SidenavComponent, PurchaseOrderContainerComponent, PaymentOrderContainerComponent, ClaimOrderContainerComponent, ReportContainerComponent, CartComponent, ProductCardComponent, PreviewComponent, PaymentOrderGridComponent, PaymentMethodComponent, TotalResumeComponent, HedearSupplierComponent, OrderButtonsComponent, AddProductModalComponent, PaymentPreviewComponent, ReportsScreenComponent, DatePickerComponent, OrdersGridComponent, PaymentListComponent],
  providers: [],
  imports: [CommonModule, FormsModule, NgbModule, NgbPaginationModule, NgbDropdownModule, NgbToastModule,RouterModule, RouterChildModule, NgbModalModule, SweetAlert2Module.forRoot({
    provideSwal: () => import('sweetalert2').then(({ default: swal }) => swal.mixin({
      // example: set global options here
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`
    }))
  }), ReactiveFormsModule],
  exports: [HomeComponent],
})
export class PurchaseModule {}
