import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/'; // Establece el delimitador para el formato de fecha

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let dateParts = value.trim().split(this.DELIMITER);
      if (dateParts.length === 3) {
        let date: NgbDateStruct = { day: parseInt(dateParts[0], 10), month: parseInt(dateParts[1], 10), year: parseInt(dateParts[2], 10) };
        // Verifica que cada parte de la fecha sea un número válido
        if (!isNaN(date.day) && !isNaN(date.month) && !isNaN(date.year)) {
          return date;
        }
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ? `${this.pad(date.day)}${this.DELIMITER}${this.pad(date.month)}${this.DELIMITER}${date.year}` : '';
  }

  pad(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }
}