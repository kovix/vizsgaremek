import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConv'
})
export class DateConvPipe implements PipeTransform {

  transform(value: string|undefined, ...args: unknown[]): string|undefined {
    if(!value) return value;
    const retval = new Date(value).toLocaleString();
    return retval;
  }

}
