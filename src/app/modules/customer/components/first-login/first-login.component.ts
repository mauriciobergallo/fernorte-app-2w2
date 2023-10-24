import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fn-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent {
  forgot: boolean = false;
  user = {
    password: ''
  };

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
       this.forgot = params['forgot'] === 'true';
    });

    console.log(this.forgot);
  }

  onFirstLogin() {
    // Agregar lógica para restablecer la contraseña del usuario
    console.log('Nueva Contraseña:', this.user.password);
    // Aquí puedes agregar la lógica para restablecer la contraseña
  }

  onResetPassword() {
    // Agregar lógica para restablecer la contraseña del usuario
    console.log('Nueva Contraseña:', this.user.password);
    // Aquí puedes agregar la lógica para restablecer la contraseña
  }
}