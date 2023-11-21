import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcularTotal'
})
export class CalcularTotalPipe implements PipeTransform {

  transform(quantity: number, price: number): number {
    return quantity * price;
  }
  
}

