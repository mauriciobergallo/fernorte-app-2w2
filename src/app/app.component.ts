import { Component } from '@angular/core';
import { LoginService } from './modules/customer/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private auth: LoginService, private route: Router) {}

  isLogged() {
    return this.auth.isLogged();
  }

  getRole() {
    return this.auth.getRole()[0];
  }

  getEmail() {
    return this.auth.getEmail();
  }

  logOut() {
    Swal.fire({
      title: `¿Estás seguro que desea cerrar sesión?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: '¡Sí, cerrar sesión!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logOut();
        this.route.navigate(['login']);
      }
    });
  }
}
