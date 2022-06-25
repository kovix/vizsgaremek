import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity } from 'src/app/model/entity';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';

/* eslint-disable-next-line */
@Component({
  selector: '[app-base-list-row]',
  templateUrl: './base-list-row.component.html',
  styleUrls: ['./base-list-row.component.scss']
})
export class BaseListRowComponent<GenericEntity extends Entity> {

  @Input() columnDefinition: ColumnDefinition[] = [];
  @Input() entity!: GenericEntity;
  @Input() actionButtons: ButtonDefinition[] = [];
  @Input() rowSelectable: boolean = false;

  @Output() customButtonClicked: EventEmitter<CustomButtonEvent> = new EventEmitter();
  @Output() rowSelected: EventEmitter<string> = new EventEmitter();

  public selectedRow: boolean = false;

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

  public resolveObjProp(obj: { [key: string]: any }, prop: string): { [key: string]: any } | undefined {
    let objCopy = {...obj};
    prop = prop.replace(/\[(\w+)\]/g, '.$1');
    prop = prop.replace(/^\./, '');
    const parts = prop.split('.');

    parts.forEach((part) => {
      if(part in objCopy) {
        objCopy = objCopy[part];
      } else {
        return;
      }
    });
    return objCopy;
  }

  onCellClick(): void {
    if(!this.rowSelectable) return;
    this.selectedRow = !this.selectedRow;
    this.rowSelected.emit(this.entity._id);
  }

}
