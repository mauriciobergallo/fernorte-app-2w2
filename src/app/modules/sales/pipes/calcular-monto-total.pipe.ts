import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcularMontoTotal'
})
export class CalcularMontoTotalPipe implements PipeTransform {

  transform(subTotal:number, impuesto:number): number {
    return Number((subTotal + impuesto).toFixed(2))
  }

}
