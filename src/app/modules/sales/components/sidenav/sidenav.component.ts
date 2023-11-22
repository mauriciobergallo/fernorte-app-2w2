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

  userName: string = "Pepito"
  rol:string = "Vendedor"
  turn:TurnModel={number:0,created_at:new Date,id_customer:0}
  cancelBtn:boolean=true
  nextBtn:boolean=false 

  constructor(private router:Router,
    private turnService:TurnServicesService) { }

  ngOnInit() {
  }

  nextTurn(){
    console.log(this.turn)

    this.turnService.nextTurn().subscribe(x=>{
      this.turn=x;
    })
    console.log(this.turn)
    this.nextBtn=true
    this.cancelBtn=false

  }
  clearTurn(){
    this.turn= this.turnService.clearTurn()
    this.nextBtn=false
    this.cancelBtn=true
  }



}
