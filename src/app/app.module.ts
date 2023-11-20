import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CatalogModule } from './modules/catalog/catalog.module';
import { CustomerModule } from './modules/customer/customer.module';
import { InventaryModule } from './modules/inventory/inventory.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { SalesModule } from './modules/sales/sales.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { RoleListComponent } from './role-list/role-list.component';
import { LoginComponent } from './modules/customer/components/login/login.component';
import { FirstLoginComponent } from './modules/customer/components/first-login/first-login.component';
import { ForgotPasswordComponent } from './modules/customer/components/forgot-password/forgot-password.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [AppComponent, RoleListComponent, LoginComponent, FirstLoginComponent, ForgotPasswordComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,
    CatalogModule,
    CustomerModule,
    PurchaseModule,
    InventaryModule,
    SalesModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
