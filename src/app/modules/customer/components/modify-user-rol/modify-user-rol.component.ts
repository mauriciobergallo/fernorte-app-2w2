import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { UserResponseDTO } from '../../models/userResponseDTO';
import { Role } from '../../models/role';
import { filter } from 'rxjs';

@Component({
  selector: 'fn-modify-user-rol',
  templateUrl: './modify-user-rol.component.html',
  styleUrls: ['./modify-user-rol.component.css']
})

export class ModifyUserRolComponent{

	userRolForm!: NgForm;
	closeResult = '';
	username: string = '';
  	usuario: UserResponseDTO | undefined; // Define la interfaz de usuario según tus modelos
	rolesDisponibles: Role[] = [];


	constructor(private modalService: NgbModal, private userService: UserService,private roleService: RoleService) {}

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
			this.userService.getUserByUsername(this.username).subscribe((user) => {
			this.usuario = user;
		});
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