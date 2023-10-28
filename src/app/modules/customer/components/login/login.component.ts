import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  constructor(private loginService: LoginService, private router: Router, private userService: UserService){}

  public onAdd(form: NgForm) {
    if (form.valid) {

      this.loginService.onLogin(this.login).subscribe(
        (respuesta: User) => {
          this.userService.document_number = respuesta.document_number;
          alert("Bienvenido " + respuesta.username);
          if(respuesta.first_login == false)
          {
            this.router.navigate(['/first-login', false]);
          }
          else{
            if(respuesta.password_reset == true){
              this.router.navigate(['/first-login', true]);
            }
            else{
              alert('logueado exitosamente');
            }
          }

        },
        (error: any) => {
          alert("Servicio no disponible");
        }
      );
    }
  }


  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}

