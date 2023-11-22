import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateIconPipe',
})
export class StateIconPipePipe implements PipeTransform {
  transform(state: string): string {
    switch (state) {
      case 'CREATED':
        return 'bi bi-file-earmark-plus';
      case 'PARTIALLY_DELIVERED':
        return 'bi bi-clock';
      case 'DELIVERED':
        return 'bi bi-check-circle';
      case 'CANCELED':
        return 'bi bi-x-circle';
      default:
        return '';
    }
  }
}
