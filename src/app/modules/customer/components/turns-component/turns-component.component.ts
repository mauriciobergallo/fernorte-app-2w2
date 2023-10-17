import { Component } from '@angular/core';
import { TurnService } from '../../services/turn.service';

@Component({
  selector: 'fn-turns-component',
  templateUrl: './turns-component.component.html',
  styleUrls: ['./turns-component.component.css']
})
export class TurnsComponentComponent {
  ToCustomer: boolean = false;
  ToNoCustomer: boolean = false;
  Main: boolean = true;

  constructor(public turnService: TurnService){}

  redirectToCustomer() {
    this.ToCustomer = true;
    this.Main = false;
  }

  redirectToNoCustomer() {
    this.ToNoCustomer = true;
    this.Main = false;
  }

  eventBack(){
    this.Main = true;
    this.ToCustomer = false;
    this.ToNoCustomer = false;
  }
}
