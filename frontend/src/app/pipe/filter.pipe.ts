import { Pipe, PipeTransform } from '@angular/core';
import { CountReporterService } from '../service/genericTable/count-reporter.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(
    private countCommunicator: CountReporterService
  ) { }

  transform<T extends {[key: string]: any}>(value: T[]|null, phrase: string, activeValue: boolean, featuredValue: boolean, listTitle: string|null): T[]|null {
    const reportTitle = listTitle || '';
    if (!Array.isArray(value) || value.length === 0 ) {
      this.countCommunicator.reportCount(reportTitle, 0);
      return value;
    }

    let filteredValue: T[] = value;

    if (value[0].hasOwnProperty('active')) {
      filteredValue = value.filter(val => val['active'] === activeValue);
    }

    if (value[0].hasOwnProperty('featured')) {
      filteredValue = filteredValue.filter(val => val['featured'] === featuredValue);
    }

    const ret = filteredValue.filter((entity) => {
      let numberPhrase = parseInt(phrase);
      if (!isNaN(numberPhrase)) {
        for (const [key, value] of Object.entries(entity)) {
          if (value === numberPhrase) return true;
        }
        return false;
      } else {
        for (const [key, value] of Object.entries(entity)) {
          if (typeof value === 'string') {
            if (value.toLowerCase().includes(phrase.toLowerCase())) return true;
          }
        }
        return false;
      }
    });
    this.countCommunicator.reportCount(reportTitle, ret.length);
    return ret;
  }

}
