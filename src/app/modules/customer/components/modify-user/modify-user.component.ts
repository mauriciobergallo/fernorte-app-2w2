import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Role } from '../../models/role';
import { UserResponseDTO } from '../../models/userResponseDTO';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'fn-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit{
  username: string = '';
  usuario: UserResponseDTO | undefined; // Define la interfaz de usuario según tus modelos
  selectedRole: Role | null = null; // Inicialmente, no se selecciona ningún rol

  rolesDisponibles: Role[] = [];

  constructor(private userService: UserService,private roleService: RoleService) {}
  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe((roles) => {
      this.rolesDisponibles = roles;
    });
  }

 

  buscarUsuario() {
    this.userService.getUserByUsername(this.username).subscribe((user) => {
      this.usuario = user;
  
      // Obtener roles disponibles
      this.roleService.getAllRoles().subscribe((roles) => {
        this.rolesDisponibles = roles;
      });
    });
  }

  

  quitarRol(role: Role) {
    if (this.usuario) {
      // Filtra los roles para quitar el role seleccionado
      this.usuario.roles = this.usuario.roles.filter(r => r.name !== role.name);
      
      // Crea un array de IDs de roles actualizado
      const newRoles = this.usuario.roles.map(r => r.name);
  
      // Llama al servicio para actualizar los roles en el backend
      this.userService.modifyUserRoles(this.usuario, []).subscribe((updatedUser) => {
        this.usuario = updatedUser;
      });
    }
  }

  agregarRol(selectedRole: Role | null) {
    if (this.usuario && selectedRole) {
        // Agrega el rol seleccionado al usuario
        this.usuario.roles.push(selectedRole);

        // Llama al servicio para actualizar los roles en el backend
        this.userService.modifyUserRoles(this.usuario, []).subscribe((updatedUser) => {
            this.usuario = updatedUser;
        });
    }
}
}
