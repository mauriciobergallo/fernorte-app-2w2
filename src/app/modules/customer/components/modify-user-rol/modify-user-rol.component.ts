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

	userName: string = '';
	userExist: boolean = false;
  	user: UserResponseDTO | null = null;
	allRoles: Role[] = [];
	assignedRoles: Role[] = [];
	unassignedRoles: Role[] = [];
	selectedRole: Role | null = null;

	constructor(private modalService: NgbModal, private userService: UserService,private roleService: RoleService) {

	}

    open(content: any) {

		// Obtiene todos los roles
		this.roleService.getAllRoles().subscribe((roles) => {
			this.allRoles = roles;
		});
		
		this.modalService.open(content, { 
			ariaLabelledBy: 'modal-basic-title',
			backdrop: 'static'

		}).result.then(
			(result) => {

				console.log("CONTENT", content);
				console.log("RESULT", result);
				console.log("USERROL FORM", this.userRolForm);
				this.closeResult = `Closed with: ${result}`;

				if(this.user){
					this.userService.modifyUserRoles(this.user).subscribe((updatedUser) => 
					console.log(updatedUser));
				}
			},
			(reason) => {

			},
		);
	}

	searchUsername() {
		//Obtiene el usuario
		this.userService.getUserByUsername(this.userName).subscribe(
			(user) => {
				this.user = user;
				this.userExist = true;

				//Obtiene los roles no asignados para el usuario
				this.availableRoles();

				console.log(this.user.roles);
				console.log(this.allRoles);
				console.log(this.unassignedRoles);
			},
			(error) => {
				this.user = null;
				this.userExist = false;
			}
		);
	}

	availableRoles() {
		if (this.user) {
			// Crear una lista de todos los roles asignados
		  	const assignedRoles = this.user.roles;
	  
			// Filtrar los roles no asignados
			this.unassignedRoles = this.allRoles.filter(role => !assignedRoles.some(assignedRole => this.equalsRoles(role, assignedRole)));
		}
	}
	  
	equalsRoles(objeto1: Role, objeto2: Role): boolean {
		// Comparar todas las propiedades de los objetos
		return JSON.stringify(objeto1) === JSON.stringify(objeto2);
	}
	
	addRole() {
		if (this.user && this.selectedRole) {
			// Agrega el rol seleccionado al usuario
			this.user.roles.push(this.selectedRole);
			this.selectedRole = null;
			this.availableRoles();
		}
	}

	deleteRole(roleToDelete: Role | null) {
		if (this.user && roleToDelete) {
		  	// Elimina el rol seleccionado del usuario
		  	this.user.roles = this.user.roles.filter(role => role !== roleToDelete);
			this.availableRoles();
		}
	}

    onSubmitForm(userRol: NgForm) {
	}
}