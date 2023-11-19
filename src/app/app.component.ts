import { Component } from '@angular/core';
import { LoginService } from './modules/customer/services/login.service';

@Component({
  selector: 'fn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private auth: LoginService) {}

  isLogged(){
    return this.auth.isLogged()
  }
}
