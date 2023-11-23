import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnServicesService } from '../../services/turns/turnServices.service';
import { TurnModel } from '../../models/TurnModel';
import { ClientService } from '../../services/clients/client.service';

@Component({
  selector: 'fn-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  userName: string = "Pepito"
  rol:string = "Vendedor"
  turn:TurnModel={number:0,created_at:new Date,id_customer:0}
  cancelBtn:boolean=true
  nextBtn:boolean=false 

  constructor(private router:Router,
    private turnService:TurnServicesService, private clientService:ClientService) { }

  ngOnInit() {
  }

  nextTurn(){
    console.log(this.turn)

    this.turn= this.turnService.nextTurn();
    this.clientService.setIdCustomer(this.turn.id_customer)
    console.log(this.turn)
    this.nextBtn=true
    this.cancelBtn=false

  }
  clearTurn(){
    this.turn= new TurnModel;
    this.nextBtn=false
    this.cancelBtn=true
  }



}
