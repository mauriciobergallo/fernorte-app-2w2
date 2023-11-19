import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  dropdownOpen = false;

  constructor(private router:Router){

  }
}
