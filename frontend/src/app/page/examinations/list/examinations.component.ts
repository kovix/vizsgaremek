import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Observable, take } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { Examination } from 'src/app/model/examination';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { ExaminationService } from 'src/app/service/backend/examination.service';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';
import { ExaminationDialogComponent } from '../examination-dialog/examination-dialog.component';
import { AppConfigService } from 'src/app/service/app-config.service';
import { DeleteWrapperService } from 'src/app/service/delete-wrapper.service';

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.scss']
})
export class ExaminationsComponent implements OnInit {

  examinations$?: Observable<Examination[]>;
  refreshExaminations$ = new BehaviorSubject<boolean>(true);

  public columnDefinition: ColumnDefinition[] = this.configService.ExaminationcolumnDefinition;
  public actionButtons: ButtonDefinition[] = this.configService.ExaminationActionButtons;

  constructor(
    private examinationService: ExaminationService,
    private dialog: MatDialog,
    private configService: AppConfigService,
    private deleteWrapper: DeleteWrapperService
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
        this.onDelete(evt.entityID);
        break;
      default:

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
    const dialogConfig = this.configService.prepareMatDialogConfig(true, examination);
    const dialogRef = this.dialog.open(ExaminationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data) this.refreshExaminations$.next(true);
      }
    );
  }

  private onDelete(examination: string): void {
    this.examinationService.get(examination).pipe(take(1)).subscribe(
      (result) => this.deleteWrapper.delConfirmation(result._id, result.name).subscribe(
        (confirmationresultId) => this.deleteEntity(confirmationresultId)
      )
    );
  }


  private deleteEntity(id: string): void {
    if (!id) return;

    this.examinationService.delete(id).subscribe(
      (response) => {
        this.deleteWrapper.displayDeletedToastr(response.name);
        this.refreshExaminations$.next(true);
      }
    )
  }

}
