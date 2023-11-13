import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent {
  forgot: boolean = false;
  document_number = "";
  user = {
    password: ''
  };

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe(params => {
       this.forgot = params['forgot'] === 'true';
       this.document_number = params['document-number']
    });

    console.log(this.forgot);
  }

  onFirstLogin(form: NgForm) {
    this.changePassword(form);
  }

  onResetPassword(form: NgForm) {
    this.changePassword(form);
  }

  changePassword(form: NgForm){
    if(form.valid){
      this.userService.changePassword(this.user.password, this.document_number).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Se cambió la contraseña correctamente',
            icon: 'success',
          })
        //si fue un exito, no llevarlo al login sino que ya esta logeado
        },
        (error: any) => {
          Swal.fire({
            title: '¡Error!',
            text: 'No se pudo cambiar la contraseña.',
            icon: 'error',
          });
        }
      );
    }
  }
  
}