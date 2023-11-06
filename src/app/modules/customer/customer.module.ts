import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TurnsComponentComponent } from './components/turns-component/turns-component.component';
import { BtnNoCustomerComponent } from './components/btn-no-customer/btn-no-customer.component';
import { BtnCustomerComponent } from './components/btn-customer/btn-customer.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeeService } from './services/employee.service';
import { RoleService } from './services/role.service';
import { TurnService } from './services/turn.service';
import { LoginService } from './services/login.service';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CustomerService } from './services/customer.service';
import { CreateRolComponent } from './components/create-rol/create-rol.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService } from './services/category.service';
import { CustomDateParserFormatter } from './components/shared/custom-date-formatter';
import { RoleListComponent } from './components/role-list/role-list.component';
import { CaseConversionPipe } from './pipes/case-conversion.pipe';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';





@NgModule({
  declarations: [HomeComponent, TurnsComponentComponent, BtnNoCustomerComponent, BtnCustomerComponent, EmployeeRegistrationComponent,CategoryComponent,
    LoginComponent, CreateCustomerComponent, CreateRolComponent, UpdateCustomerComponent, RoleListComponent, EmployeeListComponent],
  providers: [CategoryService,  
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }, EmployeeService,
    RoleService, TurnService, LoginService, CustomerService, CaseConversionPipe],
  imports: [CommonModule, BrowserModule, ReactiveFormsModule, 
    NgbModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  exports: [HomeComponent],
})
export class CustomerModule {}