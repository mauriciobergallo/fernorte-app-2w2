import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'fn-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
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

  activateUser(userId: number) {
    this.userService.activateUser(userId).subscribe(
      (response) => {
        alert("Se dio de alta el usuario")
        this.loadUser();
      },
      (error) => (
        console.log(error)
      )
    )
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        alert("Se dio de baja el usuario")
        this.loadUser();
      },
      (error) => (
        console.log(error)
      )
    )
  }
}
