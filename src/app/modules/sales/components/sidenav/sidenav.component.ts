import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  userName: string = "Pepito"
  rol:string = "Vendedor"
  turnNumber: number = 1

  constructor(private router:Router) { }

  ngOnInit() {
  }



}
