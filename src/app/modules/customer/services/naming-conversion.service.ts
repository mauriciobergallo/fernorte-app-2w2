import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NamingConversionService {

  constructor() { }

  camelToSnake(obj: any): any {
		const snakeObj: any = {};
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
				snakeObj[snakeKey] = obj[key];
			}
		}
		return snakeObj;
	}
}
