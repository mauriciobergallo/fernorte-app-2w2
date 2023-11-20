import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  isLoading: boolean = false;
  user = {
    email: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    console.log('Correo Electrónico:', this.user.email);
    this.isLoading = true;
    this.userService.sendResetEmail(this.user.email).subscribe(
      (response: any) => {
        this.isLoading = false;
        if(response.success == true){
          Swal.fire({
            title: '¡Éxito!',
            text: 'Correo electrónico enviado correctamente',
            icon: 'success',
          })
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000); 
        }
      },
      (error: any) => {
        this.isLoading = false;
        if(error.status === 404){
          Swal.fire({
            title: '¡Error!',
            text: 'No se pudo validar correctamente su email.',
            icon: 'error',
          });
        }else {
          Swal.fire({
            title: '¡Error!',
            text: 'Error al enviar el correo electrónico.',
            icon: 'error',
          });
        }
      }
    );
  }

  onCancelar(){
    Swal.fire({
      title: `¿Estás seguro que desea volver al login?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "¡Sí, volver!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['login'])
      }
    });
  }
}
