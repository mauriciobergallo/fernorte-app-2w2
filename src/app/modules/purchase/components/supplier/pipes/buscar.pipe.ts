import { Pipe, PipeTransform } from '@angular/core';
import { ISupplier } from '../models/ISuppliers';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(list: ISupplier[], buscar: string = ""): ISupplier[] {

    if(buscar.length == 0){
      return list
    }

    const listaCortada = list.filter (item => item.socialReason.toLowerCase().includes(buscar) || item.fantasyName.toLowerCase().includes(buscar))

    return listaCortada;
  }

}
