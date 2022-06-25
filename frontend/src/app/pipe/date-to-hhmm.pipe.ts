import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToHHMM'
})
export class DateToHHMMPipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): string | undefined {
    if (!value) return value;
    const date = new Date(value);
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

}
