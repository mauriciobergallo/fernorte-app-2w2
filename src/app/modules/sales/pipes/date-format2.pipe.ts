import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat2'
})
export class DateFormat2Pipe implements PipeTransform {

  transform(dateArray: Date): string {   
    return `${dateArray.getDay()}/${dateArray.getMonth()}/${dateArray.getFullYear()}`;
  }

}
