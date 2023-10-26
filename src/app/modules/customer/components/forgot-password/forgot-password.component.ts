import { Component } from '@angular/core';

@Component({
  selector: 'fn-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  user = {
    email: '',
  };

  onSubmit() {
    console.log('Correo Electrónico:', this.user.email);
  }
}
