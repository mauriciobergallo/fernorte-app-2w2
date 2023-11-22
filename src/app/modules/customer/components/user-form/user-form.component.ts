import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewRole } from '../../models/new-role';
import { Empleado } from '../../models/empleado';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'fn-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() empleado: Empleado = new Empleado();
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
    private formBuilder: FormBuilder,
    private roleService: RoleService
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      selectedRole: ['', Validators.required],
    });

    this.roleService.getAllWithFormat().subscribe((roles: NewRole[]) => {
      console.log(roles);
      this.availableRoles = roles;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const documentNumber = this.empleado.documentNumber;
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

    this.selectedRole = new NewRole();
  }

  cancel() {
    this.closeComponent.emit(false);
  }
}
