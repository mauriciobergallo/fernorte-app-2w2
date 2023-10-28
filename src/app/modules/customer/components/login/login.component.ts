import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';

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

  show: boolean = false;

  constructor(private loginService: LoginService){}

  public onAdd(form: NgForm) {
    if (form.valid) {
      this.loginService.onLogin(this.login).subscribe(
        (respuesta: any) => {
          alert("Bienvenido " + respuesta.username);
        },
        (error: any) => {
          alert("Servicio no disponible");
        }
      );
    }
  }
  

}
