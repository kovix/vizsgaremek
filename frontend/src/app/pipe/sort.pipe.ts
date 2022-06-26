import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(list: any[]|null|undefined, key: string, sortDirection: string = 'A...Z'): any[]|null {
      if (!Array.isArray(list) || !key) return null;
      if (!['A...Z', 'Z...A'].includes(sortDirection)) return list;
      if (!sortDirection) sortDirection = 'A...Z';

      const direction = (sortDirection === 'A...Z') ? 1 : -1;

      return list.sort((a, b) => {
        if (typeof (a[key]) === 'number' && typeof (b[key]) === 'number') {
          return  direction * ( a[key] - b[key] );
        }
        const dataA = String(a[key]).toLowerCase();
        const dataB = String(b[key]).toLowerCase();
        return direction * dataA.localeCompare(dataB);
      });
  }

}
