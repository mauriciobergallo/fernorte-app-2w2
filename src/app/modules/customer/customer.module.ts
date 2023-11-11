import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { UserRootComponent } from './components/user-root/user-root.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationComponent } from './components/employee-registration/employee-registration.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TurnsComponentComponent } from './components/turns-component/turns-component.component';
import { BtnNoCustomerComponent } from './components/btn-no-customer/btn-no-customer.component';
import { BtnCustomerComponent } from './components/btn-customer/btn-customer.component';
import { FirstLoginComponent } from './components/first-login/first-login.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmployeeService } from './services/employee.service';
import { RoleService } from './services/role.service';
import { TurnService } from './services/turn.service';
import { LoginService } from './services/login.service';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CustomerService } from './services/customer.service';
import { CreateRolComponent } from './components/create-rol/create-rol.component';
import { UserService } from './services/user.service';
import { ModifyUserRolComponent } from './components/modify-user-rol/modify-user-rol.component';
import { ModifyUserComponent } from './components/modify-user/modify-user.component';
import { UpdateCustomerComponent } from './components/update-customer/update-customer.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService } from './services/category.service';
import { CustomDateParserFormatter } from './components/shared/custom-date-formatter';
import { RoleListComponent } from './components/role-list/role-list.component';
import { CaseConversionPipe } from './pipes/case-conversion.pipe';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CustomersSidebarComponent } from './components/customers-sidebar/customers-sidebar.component';
import { CustomersRoutingModule } from './customers-routing.module';

// const routes: Routes = [
//   { component: LoginComponent, path: 'login' },
//   { component: ForgotPasswordComponent, path: 'forgot-password' },
//   { component: FirstLoginComponent, path: 'first-login/:forgot' },
// ];

@NgModule({
  declarations: [HomeComponent, TurnsComponentComponent, BtnNoCustomerComponent, BtnCustomerComponent, EmployeeRegistrationComponent,CategoryComponent, UserRootComponent, UserFormComponent,
    LoginComponent, CreateCustomerComponent, CreateRolComponent, UpdateCustomerComponent, RoleListComponent, EmployeeListComponent, CustomersSidebarComponent,FirstLoginComponent,
    ModifyUserComponent,UpdateEmployeeComponent, ForgotPasswordComponent,ModifyUserRolComponent
  ],
  providers: [CategoryService,  
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }, EmployeeService,
    RoleService, TurnService, LoginService, CustomerService, CaseConversionPipe, DatePipe, UserService],
  imports: [CommonModule, BrowserModule, ReactiveFormsModule, 
    NgbModule, FormsModule, HttpClientModule, ReactiveFormsModule, CustomersRoutingModule],
  exports: [HomeComponent, RouterModule],
})
export class CustomerModule {}