import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: Login = {
    identity: '',
    password: ''
  }

  constructor(private loginService: LoginService, private router: Router){}

  public onAdd(form: NgForm) {
    if (form.valid) {
      this.loginService.onLogin(this.login).subscribe(
        (respuesta: any) => {
          alert("Bienvenido " + respuesta.userName);
        },
        (error: any) => {
          alert("Servicio no disponible");
        }
      );
    }
  }

  goToForgotPassword() {
    this.router.navigate(['/first-login', true]);
  }
}