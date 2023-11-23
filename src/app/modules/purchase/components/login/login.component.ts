import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../data/login';
import { User } from '../../data/user';

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
  router: Router;
  constructor(private loginService: LoginService , _router:Router){
    this.router = _router;
  }

  public onAdd(form: NgForm) {
    if (form.valid) {

      let respuesta = this.loginService.onLogin(this.login);
        if(respuesta != null) {
              Swal.fire({
                title: '¡Éxito!',
                text: 'Bienvenido ' + respuesta.username,
                icon: 'success',
              });
              this.navigate(respuesta);
          }
          else {
            Swal.fire({
              title: '¡Error!',
              text: 'Credenciales incorrectas. Verifica tus credenciales e intenta nuevamente.',
              icon: 'error',
            });
          }
    }
  }

  navigate(user: User){
    switch(user.area){
      case "Catalogo":
        this.router.navigate(['catalog']);
        break;
      case "Compras":
        this.router.navigate(['purchase']);
        break;
      case "Inventario":
        this.router.navigate(['inventory']);
        break;
      case "Ventas":
        this.router.navigate(['sales']);
        break;
      case "Sistemas":
        this.router.navigate(['customer']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }
}

