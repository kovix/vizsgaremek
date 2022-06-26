import { Pipe, PipeTransform } from '@angular/core';
import { ExaminationsInGroup } from '../model/examination-group';

@Pipe({
  name: 'findExaminationName'
})
export class FindExaminationNamePipe implements PipeTransform {

  transform(value: string|undefined, searchArray: ExaminationsInGroup[] = []): string|undefined {
    if(!value) return value;
    const ret =  Array.from(searchArray);
    return ret.find(item => item.examination?._id === value)?.examination?.name;

  }

}
