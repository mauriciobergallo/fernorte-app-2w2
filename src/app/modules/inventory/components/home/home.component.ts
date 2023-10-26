import { Component } from '@angular/core';

@Component({
  selector: 'fn-home-inventory',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showAvailability: boolean = false;
  showStorageAvailability() {
    this.showAvailability = true;
  }
  showMenu(event: boolean) {
    this.showAvailability = event;
  }
}
