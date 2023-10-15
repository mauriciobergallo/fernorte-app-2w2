import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
@NgModule({
  declarations: [HomeComponent, EmployeeRegistrationComponent, LoginComponent],
  providers: [],
  imports: [CommonModule, NgbModule, FormsModule, HttpClientModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
