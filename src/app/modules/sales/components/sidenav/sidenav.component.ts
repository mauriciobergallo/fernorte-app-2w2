import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnServicesService } from '../../services/turns/turnServices.service';
import { TurnModel } from '../../models/TurnModel';

@Component({
  selector: 'fn-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  userName: string = "V.Gomez"
  rol: string = "Vendedor"
  turn: TurnModel = { number: 1, created_at: new Date, id_customer: 0 };
  cancelBtn: boolean = true
  nextBtn: boolean = false
  client: string = "";
  counter: number = 0;
  constructor(private router: Router,
    private turnService: TurnServicesService) { }

  ngOnInit() {
  }

  nextTurn() {
    this.counter++;
    //this.client=this.turnService.nextTurn()
    console.log(this.turn)
    this.nextBtn = true
    this.cancelBtn = false
    this.router.navigateByUrl("sale-order")
    this.turn = this.turnService.nextTurn();
  }

  clearTurn() {
    this.turn = { number: 1, created_at: new Date, id_customer: 0 };
    this.nextBtn = false
    this.cancelBtn = true
  }



}
