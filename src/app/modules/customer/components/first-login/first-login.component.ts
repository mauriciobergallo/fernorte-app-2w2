import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  onFirstLogin() {
    this.onResetPassword();
  }

  onResetPassword(){
    this.userService.changePassword(this.user.password).subscribe(
      (response: any) => {
       alert('Se cambio correctamente la contraseña');
      },
      (error: any) => {
        alert('Error al cambiar la contraseña');
      }
    );
  }
}