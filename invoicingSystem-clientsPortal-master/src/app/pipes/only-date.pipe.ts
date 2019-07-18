import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyDate'
})
export class OnlyDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.split(" ")[0];
  }

}
