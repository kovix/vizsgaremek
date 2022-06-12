import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ColumnDefinition } from '../../../model/genericTable/column-definition';
@Component({
  selector: 'app-list-column-selector',
  templateUrl: './list-column-selector.component.html',
  styleUrls: ['./list-column-selector.component.scss']
})
export class ListColumnSelectorComponent implements OnInit {

  public columns: ColumnDefinition[] = [];
  public selectedOptions?: any;

  constructor(
    private dialogRef: MatDialogRef<ListColumnSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) data: ColumnDefinition[],
  ) {
    this.columns = data;
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.dialogRef.close(this.selectedOptions || []);
  }

}
