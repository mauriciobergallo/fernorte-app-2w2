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

  constructor(private loginService: LoginService){}

  public onAdd(form: NgForm){
    // this.loginService.get().subscribe( response => {
    //   console.log(response.toString)
    // });

    if(form.valid){
      this.loginService.onLogin(this.login).subscribe(response =>{
        console.log(response);
        alert("Bienvenido " + response.userName)
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        alert("Username o Password incorrecta");
        // Puedes mostrar un mensaje de error o realizar otra acción aquí
      })
    }
  }

}
