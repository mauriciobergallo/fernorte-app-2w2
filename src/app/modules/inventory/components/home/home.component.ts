import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'fn-home-inventory',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchProductVisible : boolean = true;
  searchMovementsVisible : boolean = false;

  showSearchLocationProduct() : void {
    this.searchProductVisible = true;
    this.searchMovementsVisible = false;

  }

  showSearchMovements() : void {
    this.searchMovementsVisible = true;
    this.searchProductVisible = false;

  }


}
