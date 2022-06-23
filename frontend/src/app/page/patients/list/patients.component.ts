import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/backend/patient.service';
import { AppConfigService } from 'src/app/service/app-config.service';
import { DeleteWrapperService } from 'src/app/service/delete-wrapper.service';
import { Router } from '@angular/router';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  patients$?: Observable<Patient[]>;
  refreshPatient$ = new BehaviorSubject<boolean>(true);

  public columnDefinition: ColumnDefinition[] = this.configService.PatientcolumnDefinition;
  public actionButtons: ButtonDefinition[] = this.configService.PatientActionButtons;

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private configService: AppConfigService,
    private deleteWrapper: DeleteWrapperService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.patients$ = this.refreshPatient$.pipe(switchMap(_ => this.patientService.getAll()));
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

  private openDialogWrapper(patient: string | null): void {
    if (!patient) {
      this.openDialog(new Patient());
      return;
    }

    this.patientService.get(patient).pipe(take(1)).subscribe(
      (result) => this.openDialog(result)
    );

  }

  private openDialog(patient: Patient) {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, patient);
    const dialogRef = this.dialog.open(PatientDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data) this.refreshPatient$.next(true);
      }
    );
  }

  private onDelete(examination: string): void {
    this.patientService.get(examination).pipe(take(1)).subscribe(
      (result) => this.deleteWrapper.delConfirmation(result._id, `${result.firstName} ${result.lastName} (${result.patientID})`).subscribe(
        (confirmationresultId) => this.deleteEntity(confirmationresultId)
      )
    );
  }


  private deleteEntity(id: string): void {
    if (!id) return;

    this.patientService.delete(id).subscribe(
      (response) => {
        this.deleteWrapper.displayDeletedToastr(response.name);
        this.refreshPatient$.next(true);
      }
    )
  }
}
