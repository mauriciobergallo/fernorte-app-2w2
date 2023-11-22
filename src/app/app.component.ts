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

  isAuthorized(role: String){
    let rolesUser = this.getRoles();
    if(rolesUser == null){
      return
    }
    if(rolesUser.findIndex(x => x.area == role) != -1){
      this.navigate(role)
    } else{
      Swal.fire({
        title: '¡Error!',
        text: 'Acceso no autorizado.',
        icon: 'error',
      });
    }
  }

  navigate(role: String){
    switch(role){
      case 'Catalogo':
        this.route.navigate(["/catalog"])
        return;
      case 'Compras':
        this.route.navigate(['purchase'])
        return;
      case 'Inventario':
        this.route.navigate(['inventory'])
        return;
      case 'Ventas':
        this.route.navigate(['sales'])
        return;
      case 'Sistemas':
        this.route.navigate(['customers'])
        return;
    }
  }

  getEmail(){
    return this.auth.getEmail();
  }

  getRoles(){
    return this.auth.getRole();
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
