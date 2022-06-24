import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { Consultation } from 'src/app/model/consultation';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ConsultationService } from 'src/app/service/backend/consultation.service';
import { DeleteWrapperService } from 'src/app/service/delete-wrapper.service';
import { ConsultationCreateDialogComponent } from '../consultation-create-dialog/consultation-create-dialog.component';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss']
})
export class ConsultationsComponent implements OnInit {

  consultations$?: Observable<Consultation[]>;
  refreshConsultations$ = new BehaviorSubject<boolean>(true);

  public columnDefinition: ColumnDefinition[] = this.configService.consultationColumnDefinition;
  public actionButtons: ButtonDefinition[] = this.configService.consultationActionButtons;

  constructor(
    private consultationService: ConsultationService,
    private dialog: MatDialog,
    private router: Router,
    private configService: AppConfigService,
    private deleteWrapper: DeleteWrapperService
  ) {}

  ngOnInit(): void {
    this.consultations$ = this.refreshConsultations$.pipe(switchMap(_ => this.consultationService.getAll()));
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
      case 'DETAILS':
        this.router.navigate(['/', 'consultations', evt.entityID]);
        break;
      default:

    }
  }

  private openDialogWrapper(consultation: string | null): void {
    if (!consultation) {
      this.openDialog(new Consultation());
      return;
    }

    this.consultationService.get(consultation).pipe(take(1)).subscribe(
      (result) => this.openDialog(result)
    );

  }

  private openDialog(consultation: Consultation) {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, consultation);
    const dialogRef = this.dialog.open(ConsultationCreateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data) this.refreshConsultations$.next(true);
      }
    );
  }

  private onDelete(consultation: string): void {
    this.consultationService.get(consultation).pipe(take(1)).subscribe(
      (result) => this.deleteWrapper.delConfirmation(result._id, result.name).subscribe(
        (confirmationresultId) => this.deleteEntity(confirmationresultId)
      )
    );
  }


  private deleteEntity(id: string): void {
    if (!id) return;

    this.consultationService.delete(id).subscribe(
      (response) => {
        this.deleteWrapper.displayDeletedToastr(response.name);
        this.refreshConsultations$.next(true);
      }
    )
  }


}
