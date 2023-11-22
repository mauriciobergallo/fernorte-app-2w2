import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { UserResponseDTO } from '../../models/userResponseDTO';
import { Role } from '../../models/role';
import { User } from '../../models/user';

@Component({
  selector: 'fn-modify-user-rol',
  templateUrl: './modify-user-rol.component.html',
  styleUrls: ['./modify-user-rol.component.css']
})

export class ModifyUserRolComponent implements OnInit {
onSubmit(_t9: NgForm) {
throw new Error('Method not implemented.');
}

	userRolForm!: NgForm;
	closeResult = '';

	userName: string = '';
	userExist: boolean = false;
  	user: UserResponseDTO | null = null;
	allRoles: Role[] = [];
	assignedRoles: Role[] = [];
	unassignedRoles: Role[] = [];
	selectedRole: Role | null = null;

	@Input() userToUpdate: User | undefined;


	constructor(public modalService: NgbModal, private userService: UserService, private roleService: RoleService) {

	}
	ngOnInit(): void {
		this.roleService.getAllRoles().subscribe((roles) => {
			this.allRoles = roles;
		});
		if(this.userToUpdate != null)
		{this.userName = this.userToUpdate.username
		this.searchUsername()}
	}

    // open(content: any) {

	// 	// Obtiene todos los roles
		
		
	// 	this.modalService.open(content, { 
	// 		ariaLabelledBy: 'modal-basic-title',
	// 		backdrop: 'static'

	// 	}).result.then(
	// 		(result) => {

	// 			console.log("CONTENT", content);
	// 			console.log("RESULT", result);
	// 			console.log("USERROL FORM", this.userRolForm);
	// 			this.closeResult = `Closed with: ${result}`;

				
	// 		},
	// 		(reason) => {

	// 		},
	// 	);
	// }

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
		if(this.user){
			this.userService.modifyUserRoles(this.user).subscribe((updatedUser) => 
			console.log(updatedUser));
		}
	}
}