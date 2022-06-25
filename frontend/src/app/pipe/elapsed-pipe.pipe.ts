import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedPipe'
})
export class ElapsedPipePipe implements PipeTransform {

  transform(value: string | undefined, reference: Date): string | undefined {
    if (!value) return value;
    const baseDate = Math.round(new Date(value).getTime() / 1000);
    const referenceDate = Math.round(reference.getTime() / 1000);
    const elapsed = referenceDate - baseDate;

    if (elapsed < 0) return '??:??';
    return `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${(elapsed % 60 ? String(elapsed % 60).padStart(2, '0') : '00')}`;
  }

}
