import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";


const routes: Routes = [
  {
    path: 'customers',
    component: HomeComponent, // Este es el componente que actúa como contenedor para las rutas anidadas
    children: [
      {path: 's', component: HomeComponent },
      {path: 'employees', component: EmployeeListComponent },
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
