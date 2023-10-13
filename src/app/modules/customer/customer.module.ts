import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { FormsModule, NgForm } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent, EmployeeRegistrationComponent],
  providers: [],
  imports: [CommonModule, NgbModule, FormsModule],
  exports: [HomeComponent],
})
export class CustomerModule {}
