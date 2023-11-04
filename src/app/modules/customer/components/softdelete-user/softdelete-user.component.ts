import { Component } from '@angular/core';
import { CustomerActResponse } from '../../models/customer-response';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'fn-softdelete-user',
  templateUrl: './softdelete-user.component.html',
  styleUrls: ['./softdelete-user.component.css']
})
export class SoftdeleteUserComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.userService.getAllUser().subscribe((data: User[]) => {
      this.users = data;
    });
    console.log(this.users);
  }

  activateCustomer(userId: number) {
    this.userService.activateUser(userId).subscribe(() => {
      this.loadCustomers();
    });
  }

  deleteCustomer(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadCustomers();
    });
  }
}
