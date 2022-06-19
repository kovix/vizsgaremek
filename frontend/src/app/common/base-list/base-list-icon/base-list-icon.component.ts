import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-list-icon',
  templateUrl: './base-list-icon.component.html',
  styleUrls: ['./base-list-icon.component.scss']
})
export class BaseListIconComponent  {

  @Input() direction: string = '';

  constructor() { }

}
