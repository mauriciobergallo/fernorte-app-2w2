import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/modules/customer/components/login/login.component';
import { ForgotPasswordComponent } from '../app/modules/customer/components/forgot-password/forgot-password.component';
import { FirstLoginComponent } from './modules/customer/components/first-login/first-login.component';

const routes: Routes = [
  { component: LoginComponent, path: 'login' },
  { component: ForgotPasswordComponent, path: 'forgot-password' },
  { component: FirstLoginComponent, path: 'first-login/:forgot' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
