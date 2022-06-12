import { Pipe, PipeTransform } from '@angular/core';
import { Entity } from '../model/entity';

@Pipe({
  name: 'paginateBaseList'
})
export class PaginateBaseListPipe implements PipeTransform {

  transform<T extends Entity>(value: T[] | null, ...args: any[]): T[] | null {
    if (!value) return value;
    let page: number = +args[0];
    let perPage: number = +args[1];
    return value.slice(perPage * page, perPage * (page + 1));
  }
}
