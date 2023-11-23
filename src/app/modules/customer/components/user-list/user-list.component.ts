import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ModifyUserRolComponent } from '../modify-user-rol/modify-user-rol.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';

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
        alert("Se dio de alta el usuario")
        this.loadUser();
      },
      (error) => (
        console.log(error)
      )
    )
  }

  onDelete(user: User) {
    this.userService.delete(user).subscribe(
      (response) => {
        alert("Se dio de baja el usuario")
        this.loadUser();
      },
      (error) => (
        console.log(error)
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
}