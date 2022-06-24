import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'userRoleFilter'
})
export class UserRoleFilterPipe implements PipeTransform {

  transform(value: User[] | null, role: number): User[] | null {
    if (!value) return value;
    return value.filter(user => user.role === role);
  }

}
