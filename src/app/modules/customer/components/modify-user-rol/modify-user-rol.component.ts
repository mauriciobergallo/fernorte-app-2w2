import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { UserResponseDTO } from '../../models/userResponseDTO';
import { Role } from '../../models/role';

@Component({
  selector: 'fn-modify-user-rol',
  templateUrl: './modify-user-rol.component.html',
  styleUrls: ['./modify-user-rol.component.css']
})

export class ModifyUserRolComponent{

	userRolForm!: NgForm;
	closeResult = '';

	username: string = '';
	usuarioExistente: boolean = false; // Inicialmente, el nombre no existe.
  	usuario: UserResponseDTO | undefined; // Define la interfaz de usuario según tus modelos
	rolesAsignados: Role [] = [];
	rolesDisponibles: Role[] = [];


	constructor(private modalService: NgbModal, private userService: UserService,private roleService: RoleService) {
		this.rolesDisponibles = [
			{ name: 'Administrador', area: 'Administración' },
			{ name: 'Editor', area: 'Contenido' },
			{ name: 'Ventas', area: 'General' },
		  ];

		this.rolesAsignados = [
			{name: 'Ventas', area: 'General'}
		]

		this.usuario = {
			user_name: 'gonzalo',
			document_number: '41481418',
			roles: this.rolesAsignados
		} 
	}

    open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("USERROL FORM", this.userRolForm);

				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {

			},
		);
	}

	searchedUsername() {
		this.userService.getUserByUsername(this.username).subscribe(
		  (user) => {
			// Usuario encontrado: Mostrar la marca de verificación verde
			this.usuario = user;
			this.usuarioExistente = true; // Propiedad para indicar que el usuario existe
		  },
		  (error) => {
			// Usuario no encontrado: Mostrar la cruz roja
			this.usuario = undefined;
			this.usuarioExistente = false; // Propiedad para indicar que el usuario no existe
		  }
		);
	  }

	selectedRole() {
		this.roleService.getAllRoles().subscribe((roles) => {
			// Elimina los roles que el usuario ya tiene
			this.rolesDisponibles = roles.filter(item => !this.usuario?.roles.includes(item));
		 });	
	}



    onSubmitForm(userRol: NgForm) {
		console.log("userRol", userRol);
	}
}