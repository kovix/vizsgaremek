import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Observable, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Examination } from 'src/app/model/examination';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { ExaminationService } from 'src/app/service/backend/examination.service';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';
import { ExaminationDialogComponent } from '../examination-dialog/examination-dialog.component';

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.scss']
})
export class ExaminationsComponent implements OnInit {

  examinations$?: Observable<Examination[]>;
  refreshExaminations$ = new BehaviorSubject<boolean>(true);

  public columnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'Név',
      column: 'name',
    }),
    new ColumnDefinition({
      title: 'Alapértelmezett idő',
      column: 'defaultTime',
    }),
    new ColumnDefinition({
      title: 'Létrehozva',
      column: 'createdAt',
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt'
    }),
  ];

  public actionButtons: ButtonDefinition[] = [

    {
      title: 'Szerkesztés',
      icon: 'fa-pencil text-primary',
      eventId: 'EDIT',
    },
    {
      title: 'Törlés',
      icon: ' fa-trash text-danger',
      eventId: 'DELETE',
    },
  ];

  constructor(
    private examinationService: ExaminationService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.examinations$ = this.refreshExaminations$.pipe(switchMap(_ => this.examinationService.getAll()));
  }

  onCustomButtonClicked(evt: CustomButtonEvent): void {
    switch (evt.eventID) {
      case 'EDIT':
        this.openDialogWrapper(evt.entityID);
        break;
      case 'CREATE':
        this.openDialogWrapper(null);
        break;
      case 'DELETE':
        //this.onDeleteProduct(evt);
        break;

      default:
        this.toastr.warning(`Got event ${evt.eventID} for entity ${evt.entityID}`, 'Unknown event received', {
          positionClass: 'toast-bottom-right'
        });
    }
  }

  private openDialogWrapper(examination: string | null): void {
    if (!examination) {
      this.openDialog(new Examination());
      return;
    }

    this.examinationService.get(examination).pipe(take(1)).subscribe(
      (result) => this.openDialog(result)
    );

  }

  private openDialog(examination: Examination) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'dialog-responsive'
    dialogConfig.autoFocus = true;
    dialogConfig.data = examination;
    const dialogRef = this.dialog.open(ExaminationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data) this.refreshExaminations$.next(true);
      }
    );

  }

}
