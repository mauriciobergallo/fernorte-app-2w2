import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-report-container',
  templateUrl: './report-container.component.html',
  styleUrls: ['./report-container.component.css']
})
export class ReportContainerComponent {

  constructor(private router:Router){

  }

  onClick(){
    this.router.navigate(['/grafics']);
  }

}
