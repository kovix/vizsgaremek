import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entity } from 'src/app/model/entity';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';


@Component({
  selector: '[app-base-list-row]',
  templateUrl: './base-list-row.component.html',
  styleUrls: ['./base-list-row.component.scss']
})
export class BaseListRowComponent<GenericEntity extends Entity>  implements OnInit {

  @Input() columnDefinition: ColumnDefinition[] = [];
  @Input() entity!: GenericEntity;
  @Input() actionButtons: ButtonDefinition[] = [];

  @Output() customButtonClicked: EventEmitter<CustomButtonEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  isBooleanColumn(entity: any) {
    return typeof entity === 'boolean';
  }

  onCustomButtonClicked(eventId: string, entity: GenericEntity): void {
    const event: CustomButtonEvent = {
      entityID: entity._id,
      eventID: eventId,
    };
    this.customButtonClicked.emit(event);
  }

}
