import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-customers-sidebar',
  templateUrl: './customers-sidebar.component.html',
  styleUrls: ['./customers-sidebar.component.css']
})
export class CustomersSidebarComponent {

  constructor(private auth: LoginService, private route: Router) {}

  cerrarSesion() {
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
