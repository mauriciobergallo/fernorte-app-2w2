import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { CustomersSidebarComponent } from './components/customers-sidebar/customers-sidebar.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [HomeComponent, CustomersSidebarComponent, EmployeeListComponent],
  providers: [LoginService],
  imports: [ CommonModule, BrowserModule, ReactiveFormsModule, 
    NgbModule, FormsModule, HttpClientModule, ReactiveFormsModule, CustomersRoutingModule],
  exports: [HomeComponent,RouterModule ],
})
export class CustomerModule {}
