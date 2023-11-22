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

  showPassword: boolean = false;
  passwordFieldType: string = 'password';

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
                this.router.navigate([respuesta.document_number ,'first-login', true]);
              }, 3000);
            }
            else{
              Swal.fire({
                title: '¡Éxito!',
                text: 'Bienvenido ' + respuesta.username,
                icon: 'success',
              });
              this.navigate(respuesta.roles[0].area)
            }
          },
          (error: any) => {
            console.log(error)
            if (error.status === 400) {
              // Not Found (400) - Usuario o contraseña incorrecta
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  goToForgotPassword() {
    this.router.navigate(['forgot-password/']);
  }

  navigate(role: String){
    switch(role){
      case 'Catalogo':
        this.router.navigate(["/catalog"])
        return;
      case 'Compras':
        this.router.navigate(['purchase'])
        return;
      case 'Inventario':
        this.router.navigate(['inventory'])
        return;
      case 'Ventas':
        this.router.navigate(['sales'])
        return;
      case 'Sistemas':
        this.router.navigate(['customers'])
        return;
    }
  }
}

