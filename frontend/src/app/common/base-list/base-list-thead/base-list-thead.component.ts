import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';

@Component({
  selector: '[app-base-list-thead]',
  templateUrl: './base-list-thead.component.html',
  styleUrls: ['./base-list-thead.component.scss']
})
export class BaseListTheadComponent implements OnInit {

  @Input() columns?: ColumnDefinition[];
  @Input() sortKey: string = '';
  @Input() direction: string = '';

  @Output() headerClicked: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClicked(column: string): void {
    this.headerClicked.emit(column);
  }

}
