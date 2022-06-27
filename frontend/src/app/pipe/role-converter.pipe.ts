import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigService } from '../service/app-config.service';

@Pipe({
  name: 'roleConverter'
})
export class RoleConverterPipe implements PipeTransform {

  constructor(
    private configService: AppConfigService
  ) {}

  transform(value: string|undefined): string|undefined {
    if (!value) return value;

    const itm = this.configService.Roles.filter(role => role.id === parseInt(value)).map(found => found.name);
    if (Array.isArray(itm) && itm.length === 1) return itm[0];
    return '';
  }

}
