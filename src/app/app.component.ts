import { Component } from '@angular/core';
import { LoginService } from './modules/customer/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private auth: LoginService, private route: Router) {}

  isLogged(){
    return this.auth.isLogged();
  }

  getEmail(){
    return this.auth.getEmail();
  }

  logOut(){
    Swal.fire({
      title: `¿Estás seguro que desea cerrar sesión?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "¡Sí, cerrar sesión!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logOut();
        this.route.navigate(['login'])
      }
    });
  }
}
