import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/customer/services/login.service';

@Component({
  selector: 'fn-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  purchaseDropdownOpen: boolean = false;
  paymentDropdownOpen: boolean = false;

  constructor(private router:Router, private auth: LoginService){

  }

  getRoles(){
    return this.auth.getRoles()
  }
}
