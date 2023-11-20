import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

function matchPasswordValidator(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const password = c.get('password');
  const passwordConfirm = c.get('confirmPassword');
  
  if (password!.value !== passwordConfirm!.value) {
    return { 'match-password': true };
  }

  return null;
}

function markFormGroupTouched(formGroup: FormGroup) {
  Object.values(formGroup.controls).forEach((control: AbstractControl) => {
    control.markAsTouched();

    if (control instanceof FormGroup) {
      markFormGroupTouched(control);
    }
  });
}

@Component({
  selector: 'fn-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {
  forgot: boolean = false;
  document_number = "";
  form: FormGroup = new FormGroup({});
  user = {
    password: '',
    confirmPassword: '',
  };

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private fb: FormBuilder, private auth: LoginService) {
    this.route.params.subscribe(params => {
       this.forgot = params['forgot'] === 'true';
       this.document_number = params['document-number']
    });

    console.log(this.forgot);
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(8),]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8),]]
    }, { validators: [matchPasswordValidator] })
  }

  onFirstLogin() {
    this.changePassword();
  }

  changePassword(){
    markFormGroupTouched(this.form);
    if(this.form.valid){
      this.user = this.form.value;
      this.userService.changePassword(this.user.password, this.document_number).subscribe(
        (response: any) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Se cambió la contraseña correctamente',
            icon: 'success',
          });
          this.auth.setPasswordReset();
          this.router.navigate(['customers'])
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