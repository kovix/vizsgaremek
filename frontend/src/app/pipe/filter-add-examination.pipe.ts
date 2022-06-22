
import { Pipe, PipeTransform } from '@angular/core';
import { Examination } from '../model/examination';
import { ExaminationsInGroup } from '../model/examination-group';

@Pipe({
  name: 'filterAddExamination'
})
export class FilterAddExaminationPipe implements PipeTransform {

  transform(value: Examination[] | null, existing: ExaminationsInGroup[]): Examination[] | null {
    if (!value) return value;
    return value.filter((item) => {
      const isExisting = existing.findIndex((existingItem) => existingItem.examination?._id === item._id) !== -1;
      return !isExisting;
    })
  }

}
