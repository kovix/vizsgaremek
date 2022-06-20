import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { ExaminationGroup } from 'src/app/model/examination-group';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ExaminationGroupService } from 'src/app/service/backend/examination-group.service';
import { DeleteWrapperService } from 'src/app/service/delete-wrapper.service';
import { ExaminationGroupDialogComponent } from '../examination-group-dialog/examination-group-dialog.component';

@Component({
  selector: 'app-examination-groups',
  templateUrl: './examination-groups.component.html',
  styleUrls: ['./examination-groups.component.scss']
})
export class ExaminationGroupsComponent implements OnInit {
  examinationGroups$?: Observable<ExaminationGroup[]>;
  refreshExaminationGroups$ = new BehaviorSubject<boolean>(true);

  public columnDefinition: ColumnDefinition[] = this.configService.ExaminationGroupcolumnDefinition;
  public actionButtons: ButtonDefinition[] = this.configService.ExaminationGroupActionButtons;

  public title = "Vizsgálat csoportok";
  public subTitle = "Vizsgálat csoportokhoz tartozó vizsgálatok karbantartása";

  constructor(
    private examinationGroupService: ExaminationGroupService,
    private dialog: MatDialog,
    private configService: AppConfigService,
    private deleteWrapper: DeleteWrapperService
  ) {}

  ngOnInit(): void {
    this.examinationGroups$ = this.refreshExaminationGroups$.pipe(switchMap(_ => this.examinationGroupService.getAll()));
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

  private openDialogWrapper(examinationGroup: string | null): void {
    if (!examinationGroup) {
      this.openDialog(new ExaminationGroup());
      return;
    }

    this.examinationGroupService.get(examinationGroup).pipe(take(1)).subscribe(
      (result) => this.openDialog(result)
    );
  }

  private openDialog(examinationGroup: ExaminationGroup) {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, examinationGroup);
    const dialogRef = this.dialog.open(ExaminationGroupDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data) this.refreshExaminationGroups$.next(true);
      }
    );
  }


  private onDelete(examinationGroup: string): void {
    this.examinationGroupService.get(examinationGroup).pipe(take(1)).subscribe(
      (result) => this.deleteWrapper.delConfirmation(result._id, result.name).subscribe(
        (confirmationresultId) => this.deleteEntity(confirmationresultId)
      )
    );
  }

  private deleteEntity(id: string): void {
    if (!id) return;

    this.examinationGroupService.delete(id).subscribe(
      (response) => {
        this.deleteWrapper.displayDeletedToastr(response.name);
        this.refreshExaminationGroups$.next(true);
      }
    )
  }

}
