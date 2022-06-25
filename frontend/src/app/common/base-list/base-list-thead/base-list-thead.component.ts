import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';

@Component({
  selector: '[app-base-list-thead]',
  templateUrl: './base-list-thead.component.html',
  styleUrls: ['./base-list-thead.component.scss']
})
export class BaseListTheadComponent {

  @Input() columns?: ColumnDefinition[];
  @Input() sortKey: string = '';
  @Input() direction: string = '';
  @Input() rowSelectable: boolean = false;
  @Input() hasActionButtons: boolean = true;

  @Output() headerClicked: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onClicked(column: string): void {
    this.headerClicked.emit(column);
  }

}
