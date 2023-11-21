import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  purchaseDropdownOpen: boolean = false;
  paymentDropdownOpen: boolean = false;

  constructor(private router:Router){

  }
}
