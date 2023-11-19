import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(dateArray: number[]): string {
    if (!dateArray || dateArray.length < 3) {
      return '';
    }

    const day = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];

    return `${day}/${month}/${year}`;
  }

}
