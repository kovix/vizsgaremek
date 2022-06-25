import { Pipe, PipeTransform } from '@angular/core';
import { IConsultationDetail } from '../model/consultation';

@Pipe({
  name: 'showLeavedPatients'
})
export class ShowLeavedPatientsPipe implements PipeTransform {

  transform(value: IConsultationDetail[] | undefined, displayLeaved: boolean = true): IConsultationDetail[] | undefined {
    if (!value) return value;
    if (displayLeaved) return value;
    return value.filter(val => !!val.leaved === displayLeaved);
  }

}
