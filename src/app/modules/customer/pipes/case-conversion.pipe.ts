import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caseConversion'
})
export class CaseConversionPipe implements PipeTransform {

  transform(obj: any, ...args: unknown[]): any {
    return null;
  }

  toSnakeCase(obj: any, ...args: unknown[]): any {
    const snakeObj: any = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
            snakeObj[snakeKey] = obj[key];
        }
    }
    return snakeObj;
  }

  toCamelCase(obj: any, ...args: unknown[]): any {
		if (obj === null || typeof obj !== 'object') {
		  return obj;
		}
	  
		if (Array.isArray(obj)) {
		  return obj.map(this.toCamelCase);
		}
	  
		const camelObj: { [key: string]: any } = {}; 
	  
		for (const key in obj) {
		  if (obj.hasOwnProperty(key)) {
			const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
			camelObj[camelKey] = this.toCamelCase(obj[key]);
		  }
		}
		return camelObj;
	  };

}
