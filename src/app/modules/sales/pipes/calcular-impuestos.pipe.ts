import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcularImpuestos'
})
export class CalcularImpuestosPipe implements PipeTransform {

  transform(subTotal:number, impuesto:number): number {
    return Number((subTotal * (impuesto / 100)).toFixed(2))
  }

}
