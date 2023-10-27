import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'fn-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  user = {
    email: '',
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    console.log('Correo Electrónico:', this.user.email);

    this.userService.sendResetEmail(this.user.email).subscribe(
      (response: any) => {
        if(response.success == true){
          alert('Correo electrónico enviado correctamente');
        }
        else{
          alert('No se pudo validar correctamente su email');
        }
      },
      (error: any) => {
        alert('Error al enviar el correo electrónico');
      }
    );
  }
}
