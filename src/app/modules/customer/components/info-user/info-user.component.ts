import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { UserResponseDTO } from '../../models/userResponseDTO';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { NewRole } from '../../models/new-role';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent {

  onSubmit(_t9: NgForm) {
    throw new Error('Method not implemented.');
    }
    
    @Input() readonly: boolean = false;
    
      
    
      userRolForm!: NgForm;
      closeResult = '';
    
      userName: string = '';
      userExist: boolean = false;
        user: UserResponseDTO | null = null;
      allRoles: NewRole[] = [];
      assignedRoles: NewRole[] = [];
      unassignedRoles: NewRole[] = [];
      selectedRole: NewRole | null = null;
      selectedRoles: NewRole[] = [];
    
      @Input() userToUpdate: User | undefined;
    
    
      constructor(public modalService: NgbModal, private userService: UserService, private roleService: RoleService) {
    
      }
      ngOnInit(): void {
        this.roleService.getAllRoles().subscribe((roles) => {
          this.allRoles = roles;
        });
        if (this.userToUpdate != null) {
          this.userName = this.userToUpdate.username;
          this.searchUsername();
          }
        
          // Disable form controls if in readonly mode
          if (this.readonly) {
          this.userRolForm.form.disable();
          }
        }
    
    
        
    
      searchUsername() {
        //Obtiene el usuario
        this.userService.getUserByUsername(this.userName).subscribe(
          (user) => {
            this.user = user;
            this.userExist = true;
            let role = this.allRoles.filter(itemA => user.roles.some(itemB => itemA.name === itemB.name));
            role.forEach(element => {
              this.selectedRoles.push(element)
            });
            //Obtiene los roles no asignados para el usuario
            this.availableRoles();
    
            console.log(this.selectedRoles)
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
          this.selectedRoles.push(this.selectedRole)
          this.selectedRole = null;
          this.availableRoles();
        }
      }
    
      deleteRole(roleToDelete: Role | null) {
        if (!this.readonly && this.user && roleToDelete) {
            // Elimina el rol seleccionado del usuario
            this.user.roles = this.user.roles.filter(role => role !== roleToDelete);
          this.selectedRoles = this.selectedRoles.filter(role => role.name !== roleToDelete.name);
          this.availableRoles();
        }
      }
    
        onSubmitForm(userRol: NgForm) {
        if(this.user){
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
              this.userService.modifyUserRoles(this.user, this.selectedRoles).subscribe(
                (response) => {
                  Swal.fire({
                    title: '¡Éxito!',
                    text: 'El usuario ha sido editado',
                    icon: 'success',
                    });
                    this.modalService.dismissAll();
                },
                (error) => {
                  Swal.fire({
                    title: '¡Error!',
                    text: 'Servicio no disponible.',
                    icon: 'error',
                    });
                }
              )
            }
            });
        }
      }
    
      onCancelar(){
        this.modalService.dismissAll()
      }
}
