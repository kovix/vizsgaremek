import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PageEvent } from '@angular/material/paginator';
import { delay } from 'rxjs';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';
import { ColumnStorageService } from 'src/app/service/genericTable/column-storage.service';
import { CountReporterService } from 'src/app/service/genericTable/count-reporter.service';


import { Entity } from '../../model/entity';
import { ListColumnSelectorComponent } from './list-column-selector/list-column-selector.component';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent<GenericEntity extends Entity> implements OnInit {

  @Input() entities: GenericEntity[] | null = [];
  @Input() columnDefinition: ColumnDefinition[] = [];
  @Input() actionButtons!: ButtonDefinition[];
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() enableNewButton: boolean = true;
  @Input() hideHeader: boolean = false;
  @Input() rowSelectable: boolean = false;

  @Output() customButtonClicked: EventEmitter<CustomButtonEvent> = new EventEmitter();
  @Output() rowSelectChanged: EventEmitter<string> = new EventEmitter();

  public activeValue: boolean = true;
  public featuredValue: boolean = true;
  public phrase: string = "";
  public dataTemp: any = 'id';
  public sortKey: string = 'id';
  public direction: string = 'A...Z';
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public paginateCount = { cnt: 0 };

  storedColumnDefinitionData$ = this.columnStorageService.columnDefinitonData$;

  constructor(
    private dialog: MatDialog,
    private columnStorageService: ColumnStorageService,
    private countCommunicator: CountReporterService
  ) { }

  ngOnInit(): void {
    this.columnStorageService.getColumnVisibility(this.title);

    this.countCommunicator.reportCount$.pipe(delay(0)).subscribe(countValue => {
      if (countValue.listname === this.title) {
        this.paginateCount.cnt = countValue.count;
      }
    });

    this.storedColumnDefinitionData$.subscribe(columnsReceived => {
      if (!columnsReceived || columnsReceived[0] === '(empty)') {
        this.columnDefinition.forEach(column => {
          column.visible = true;
        });
      } else {
        this.columnDefinition.forEach(column => {
          column.visible = columnsReceived.includes(column.column);
        });
      }
    });
  }



  onClickSort(data: string): void {
    if (this.dataTemp !== data) {
      this.dataTemp = data;
      this.sortKey = data
      this.direction = "A...Z";
    } else {
      this.dataTemp = null;
      this.sortKey = data
      this.direction = "Z...A";
    }
  }

  isBooleanColumn(entity: any) {
    return typeof entity === 'boolean';
  }

  onCreate() {
    const eventData: CustomButtonEvent = {
      eventID: 'CREATE',
      entityID: '_',
    };
    this.customButtonClicked.emit(eventData);
  }

  onCustomButtonClicked($event: CustomButtonEvent): void {
    this.customButtonClicked.emit($event);
  }

  handlePaginate(event?: PageEvent) {
    if (!event) {
      this.pageIndex = 1;
      this.pageSize = 10;
    } else {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
  }

  onOpenColumnSelector(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.columnDefinition;
    const dialogRef = this.dialog.open(ListColumnSelectorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.columnStorageService.setColumnVisibility(this.title, data);
      }
    );
  }

  onRowSelected(id: string): void {
    this.rowSelectChanged.emit(id);
  }

}
