import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NewRole } from '../../models/new-role';
import { Empleado } from '../../models/empleado';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, catchError, map, of } from 'rxjs';
import { UserResponseDTO } from '../../models/userResponseDTO';
import { EmployeeService } from '../../services/employee.service';
import Swal from 'sweetalert2';

class UserAsyncValidator {
  static repeatValidator(service: UserService): AsyncValidatorFn {
    return (c: AbstractControl): Observable<ValidationErrors | null> => {
      return service.getAllUser().pipe(
        map((response) => {
          return response.findIndex(x => x.document_number == c.value) != -1 ? { repeated : true} : null;
        })
      );
    };
  }
  static notFoundValidator(service: EmployeeService): AsyncValidatorFn {
    return (c: AbstractControl): Observable<ValidationErrors | null> => {
      
      return service.getEmployeeByDocumentNumber(c.value).pipe(
        map((response) => {
          return !response.document_number ? { notFound: true } : null;
        }),
        catchError((error) => {
          return of({ notFound: true });
        })
      );
      
    };
  }
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
  selector: 'fn-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  password: string = '';
  selectedRole: NewRole = new NewRole();

  availableRoles: NewRole[] = [];
  roles_name: string[] = [];
  sendRoles: NewRole[] = [];

  @Output() closeComponent= new EventEmitter<boolean>();

  userForm: FormGroup = new FormGroup({});

  @Output() userCreated = new EventEmitter<string>(); //SweetAlert?

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private modalService: NgbModal
  ) {}

  removeRole(role: string) {
    const index = this.roles_name.indexOf(role);
    if (index !== -1) {
      const roleDeleted = this.roles_name.splice(index, 1);

      if (roleDeleted.length > 0) {
        const roleToDelete = roleDeleted[0];
        const roleIndexInSendRoles = this.sendRoles.findIndex(
          (role) => role.name + ' - ' + role.area === roleToDelete
        );
        if (roleIndexInSendRoles !== -1) {
          this.sendRoles.splice(roleIndexInSendRoles, 1);
        }
      }
    }
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      documentNumber: ['', [Validators.required], [UserAsyncValidator.notFoundValidator(this.employeeService), UserAsyncValidator.repeatValidator(this.userService)] ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      selectedRole: ['', Validators.required],
    });

    this.roleService.getAllRoles().subscribe((roles: NewRole[]) => {
      console.log(roles);
      this.availableRoles = roles;
    });
    this.open(this.userForm)
  }

  onSubmit() {
    markFormGroupTouched(this.userForm);
    if (this.userForm.valid) {
      Swal.fire({
				title: `¿Estás seguro que desea editar el usuario?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#dc3545",
				cancelButtonColor: "#6c757d",
				confirmButtonText: "¡Sí, editar!",
				cancelButtonText: "Cancelar"
			  }).then((result) => {
				if (result.isConfirmed) {
					const documentNumber = this.userForm.get('documentNumber')?.value;
          const password = this.userForm.get('password')?.value;
          const roles = this.sendRoles.map((role) => role.id_role);
          this.userService.postNewUser(documentNumber, password, roles).subscribe(
						(response) => {
							Swal.fire({
								title: '¡Éxito!',
								text: 'Usuario registrado correctamente',
								icon: 'success',
							  });
                this.userService.notifyUserUpdated();
							  this.modalService.dismissAll();
						},
						(error) => {
							Swal.fire({
								title: '¡Error!',
								text: 'No se pudo registrar el usuario.',
								icon: 'error',
							  });
						}
					)
				}
			  });
    }
  }

  enviarRol(event: any) {
    const selectedRoleId = event.target.value;
    const selectedRole = this.availableRoles.find(
      (role) => role.id_role === Number(selectedRoleId)
    );

    if (selectedRole) {
      const roleToAdd = selectedRole.name + ' - ' + selectedRole.area;

      if (!this.roles_name.includes(roleToAdd)) {
        this.roles_name.push(roleToAdd);
        this.sendRoles.push(selectedRole);
      }
    }

    this.selectedRole = new NewRole();
  }

  open(content: any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' }).result.then()
  }

  cancel() {
    Swal.fire({
			title: '¿Está seguro?',
			text: 'Si cancela, perderá los datos ingresados. ¿Desea continuar?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, cancelar',
			cancelButtonText: 'No, seguir editando'
		  }).then((result) => {
			if (result.isConfirmed) {
			this.modalService.dismissAll()
			}
		  });
  }
}
