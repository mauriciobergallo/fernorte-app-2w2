import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'fn-user-root',
  templateUrl: './user-root.component.html',
  styleUrls: ['./user-root.component.css']
})
export class UserRootComponent  {
  //TODO: ese componente recibira un user, para motivos de testing se le hardcodea el user
  //@Input() user: User;
  @Input() showComponent: boolean = true;

  userHardcodeado: User = {
    id_user: 1,
    password_reset: false,
    username: 'Alex',
    documentNumber: '123456',
    roles:[
      {
        id_role: 1,
        name: "Administrator",
        area: "Compras"
      }
    ]
  };

  closeComponent(){
    this.showComponent = false;
  }
}
