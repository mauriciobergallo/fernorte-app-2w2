import { Pipe, PipeTransform } from '@angular/core';
import { ISupliers } from '../../models/ISuppliers';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(list: ISupliers[], buscar: string = ""): ISupliers[] {
    
    if(buscar.length == 0){
      return list
    }

    const listaCortada = list.filter (item => item.socialReason.toLowerCase().includes(buscar) || item.fantasyName.toLowerCase().includes(buscar))
 
    return listaCortada;
  }

}
