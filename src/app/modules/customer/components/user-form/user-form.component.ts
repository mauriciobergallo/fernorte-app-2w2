import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewRole } from '../../models/new-role';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'fn-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User | undefined;
  password: string = '';
  selectedRole: NewRole | undefined;

  availableRoles: NewRole[] = [];
  roles_name: string[] = [];
  sendRoles: NewRole[] = [];

  @Output() closeComponent= new EventEmitter<boolean>();

  userForm: FormGroup;

  @Output() userCreated = new EventEmitter<string>(); //SweetAlert?

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      selectedRole: ['', Validators.required],
    });
  }

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
    this.userService.GetAllRoles().subscribe((roles: NewRole[]) => {
      console.log(roles);
      this.availableRoles = roles;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const documentNumber = this.user?.documentNumber;
      const password = this.userForm.get('password')?.value;
      const roles = this.sendRoles.map((role) => role.id_role);

      this.userService.postNewUser(documentNumber, password, roles).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          this.userCreated.emit('Usuario creado');
        },
        (error: any) => {
          console.error('Error al enviar los datos:', error);
        }
      );
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

    this.selectedRole = undefined;
  }

  cancel() {
    this.closeComponent.emit(false);
  }
}
