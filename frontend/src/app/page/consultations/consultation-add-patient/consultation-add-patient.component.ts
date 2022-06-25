import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { Patient } from 'src/app/model/patient';
import { AppConfigService } from 'src/app/service/app-config.service';
import { PatientService } from 'src/app/service/backend/patient.service';

@Component({
  selector: 'app-consultation-add-patient',
  templateUrl: './consultation-add-patient.component.html',
  styleUrls: ['./consultation-add-patient.component.scss']
})
export class ConsultationAddPatientComponent {

  public title: string = 'Válasszon pácienst!';

  public columnDefinition: ColumnDefinition[] = this.configService.PatientSelectorcolumnDefinition;
  public actionButtons: ButtonDefinition[] = this.configService.PatientSelectorActionButtons;

  public patients$: Observable<Patient[]> = this.patientService.getAll();

  public selectedPatients: string[] = [];

  constructor(
    private dialogRef: MatDialogRef <ConsultationAddPatientComponent>,
    private patientService: PatientService,
    private configService: AppConfigService,
  ) { }

  public onRowSelected(id: string): void {
    const index = this.selectedPatients.indexOf(id);
    if (index !== -1) {
      this.selectedPatients.splice(index, 1);
    } else {
      this.selectedPatients.push(id);
    }
  }

}
