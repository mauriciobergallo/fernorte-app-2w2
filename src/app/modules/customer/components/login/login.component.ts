import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserCheckLogin } from '../../models/user-check-login';
import Swal from 'sweetalert2';

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
        (respuesta: UserCheckLogin) => {
          this.userService.document_number = respuesta.document_number;
            if(respuesta.password_reset == true){
              Swal.fire({
                title: '¡Éxito!',
                text: 'Bienvenido ' + respuesta.username + ". Le pediremos que cambie su contraseña",
                icon: 'success',
              })
              setTimeout(() => {
                this.router.navigate(['customers',respuesta.document_number ,'first-login', true]);
              }, 3000)
            }
            else{
              Swal.fire({
                title: '¡Éxito!',
                text: 'Bienvenido ' + respuesta.username,
                icon: 'success',
              })
            }
          },
          (error: any) => {
            if (error.status === 500) {
              // Error interno del servidor (500) - Usuario o contraseña incorrecta
              Swal.fire({
                title: '¡Error!',
                text: 'Usuario o contraseña incorrecta. Verifica tus credenciales e intenta nuevamente.',
                icon: 'error',
              });
            } else {
             // Se rompio Users
              Swal.fire({
                title: '¡Error!',
                text: 'Servicio no disponible',
                icon: 'error',
              });
            }
          }
      );
    }
  }


  goToForgotPassword() {
    this.router.navigate(['customers/forgot-password/']);
  }
}

