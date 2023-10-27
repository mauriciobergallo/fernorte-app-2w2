import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { UserRootComponent } from './components/user-root/user-root.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TurnsComponentComponent } from './components/turns-component/turns-component.component';
import { BtnNoCustomerComponent } from './components/btn-no-customer/btn-no-customer.component';
import { BtnCustomerComponent } from './components/btn-customer/btn-customer.component';
import { FirstLoginComponent } from './components/first-login/first-login.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  { component: LoginComponent, path: 'login' },
  { component: ForgotPasswordComponent, path: 'forgot-password' },
  { component: FirstLoginComponent, path: 'first-login/:forgot' },
];

@NgModule({
  declarations: [HomeComponent, TurnsComponentComponent, BtnNoCustomerComponent, BtnCustomerComponent, EmployeeRegistrationComponent, UserRootComponent, UserFormComponent, FirstLoginComponent, LoginComponent, ForgotPasswordComponent],
  providers: [],
  imports: [CommonModule, BrowserModule, ReactiveFormsModule, NgbModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule, RouterModule.forRoot(routes)],
  exports: [HomeComponent, RouterModule],
})
export class CustomerModule {}