import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ModifyUserRolComponent } from '../modify-user-rol/modify-user-rol.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent  implements OnInit {

  @ViewChild('userRolForm') updateUserModal: TemplateRef<any> | undefined;
  @ViewChild('newUserForm') newUserModal: TemplateRef<any> | undefined;

  userList: User[] = [];

  constructor(private userService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadUser();
    this.userService.getUserUpdatedObservable().subscribe(() => {
      this.loadUser();
    });
  }

  loadUser() {
    this.userService.getAllUser().subscribe((data: User[]) => {
      this.userList = data;
    });
    console.log(this.userList);
  }

  onOptionClick(selectedOption: string) {
    // Acción a realizar cuando se selecciona una opción
    console.log('Opción seleccionada:', selectedOption);
  }

  onActive(user: User) {
    this.userService.active(user).subscribe(
      (response) => {
        this.showInfoActivedResult();
        this.loadUser()
      },
      (error) => (
        this.showErrorInServer()
      )
    )
  }

  onDelete(user: User) {
    this.userService.delete(user).subscribe(
      (response) => {
        this.showInfoDesactivedResult();
        this.loadUser()
      },
      (error) => (
        this.showErrorInServer()
      )
    )
  }

  onUpdate(user: User){
    const modalRef = this.modalService.open(ModifyUserRolComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
    modalRef.componentInstance.userToUpdate = user;

    modalRef.componentInstance.updateClicked.subscribe(() => {
      // Abrir el modal del formulario de actualización
      this.modalService.open(this.updateUserModal); 
      console.log('se abrio el modal del usuario y sus roles');
    });
  }

  openNewUserModal(){
    const modalRef = this.modalService.open(UserFormComponent, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
     
    modalRef.componentInstance.updateClicked.subscribe(() => {
      this.modalService.open(this.newUserModal);
      console.log('se abrio el modal del usuario');

    });
  }

  showConfirmationReactivate(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres reactivar el usuario?',
      icon: 'question',
      confirmButtonText: 'Sí, reactivar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onActive(user);
      }
    });
  }

  showConfirmationDelete(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar el usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDelete(user);
      }
    });
  }

  showInfoActivedResult() {
    Swal.fire({
      title: 'Resultado',
      text: 'Se dio de alta el usuario',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ok',
    });
  }

  showInfoDesactivedResult() {
    Swal.fire({
      title: 'Resultado',
      text: 'Se dio de baja el usuario',
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'ok',
    });
  }

  showErrorInServer() {
    Swal.fire({
      title: '¡Error!',
      text: 'Servicio no disponible',
      icon: 'error',
    });
  }
}