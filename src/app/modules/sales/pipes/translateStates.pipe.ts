import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateStates'
})
export class TranslateStatesPipe implements PipeTransform {

  transform(statesApi: string): string {
    if(statesApi === 'CANCELLED') {
      return 'Cancelada'
    } else if(statesApi === 'PENDING_DELIVERY') {
      return 'Pendiente de entrega'
    } else if(statesApi === 'CREATE') {
      return 'Creada'
    } else if(statesApi === 'UNBILLED') {
      return 'Impaga'
    }
    return 'Entregada'
  }

}
