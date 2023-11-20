import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcularMontoTotal'
})
export class CalcularMontoTotalPipe implements PipeTransform {

  transform(subTotal:number, impuesto:number): number {
    if(subTotal == 0)
      impuesto = 0;
    return Number(subTotal)
  }

}
