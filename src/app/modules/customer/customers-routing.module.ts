import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { NgModule } from "@angular/core";
import { CreateCustomerComponent } from "./components/create-customer/create-customer.component";
import { CreateRolComponent } from "./components/create-rol/create-rol.component";
import { RoleListComponent } from "./components/role-list/role-list.component";
import { TurnsComponentComponent } from "./components/turns-component/turns-component.component";
import { LoginComponent } from "./components/login/login.component";
import { UpdateCustomerComponent } from "./components/update-customer/update-customer.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";


  const routes: Routes = [
    {
      path: 'customers',
      component: HomeComponent, // Este es el componente que actúa como contenedor para las rutas anidadas
      children: [
        { path: 's', component: HomeComponent },
        { path: 'employees', component: EmployeeListComponent },
        {path: 'create-rol', component: CreateRolComponent},
        {path: 'role', component: RoleListComponent},
        {path: 'turns', component: TurnsComponentComponent},
        {path: "login", component: LoginComponent},
        {path: "update-costumer", component: UpdateCustomerComponent},
        {path: 'forgot-password', component: ForgotPasswordComponent }
      ]
    }]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CustomersRoutingModule {}