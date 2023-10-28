import { Component, Input } from '@angular/core';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'fn-user-root',
  templateUrl: './user-root.component.html',
  styleUrls: ['./user-root.component.css']
})
export class UserRootComponent  {
  //TODO: ese componente recibira un empleado, para motivos de testing se le hardcodea el empleado
  //@Input() empleado: Empleado;
  @Input() showComponent: boolean = true;

  empleadoHardcodeado: Empleado = {
    id_employee: 1,
    first_name: 'Juan',
    last_name: 'Pérez',
    documentNumber: '12345'
  };

  closeComponent(){
    this.showComponent = false;
  }
}
