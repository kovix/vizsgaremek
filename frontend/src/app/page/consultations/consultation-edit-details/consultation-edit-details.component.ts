import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { iPatientEditData } from 'src/app/model/consultation';
import { AppConfigService, iAlertStatuses } from 'src/app/service/app-config.service';
import { ConsultationService } from 'src/app/service/backend/consultation.service';
import { ConsultationCreateDialogComponent } from '../consultation-create-dialog/consultation-create-dialog.component';

@Component({
  selector: 'app-consultation-edit-details',
  templateUrl: './consultation-edit-details.component.html',
  styleUrls: ['./consultation-edit-details.component.scss']
})
export class ConsultationEditDetailsComponent implements OnInit {

  public title: string = '';
  public fb!: FormGroup;
  public alertStatuses: iAlertStatuses[] = this.configService.alertStatuses;

  private timePattern = /^$|^\d{1,2}:\d{1,2}$/;
  private clickTimers: {[key:string]: number} = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iPatientEditData,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef <ConsultationEditDetailsComponent>,
    private consultationService: ConsultationService,
    private configService: AppConfigService,
  ) { }

  ngOnInit(): void {
    this.title = `${this.data?.data?.patient?.firstName} ${this.data?.data?.patient?.lastName}`;

    const group: any = {};
    group.arrived = [this.getTimeFromDate(this.data.data.arrived), Validators.pattern(this.timePattern)];
    group.leaved = [this.getTimeFromDate(this.data.data.leaved), Validators.pattern(this.timePattern)];
    group.comment = [this.data.data.comment];
    group.alert = [this.data.data.alert];
    group.examinations = this.formBuilder.array([]);

    this.data.data.patientConsultations.forEach((exam) => {
      const disabled = !exam.required;
      const grouptoAdd = this.formBuilder.group({
        examinationID: [exam.examinationID],
        required: [exam.required],
        startedAt: [{value: this.getTimeFromDate(exam.startedAt), disabled: disabled}, Validators.pattern(this.timePattern)],
        finishedAt: [{value: this.getTimeFromDate(exam.finishedAt), disabled: disabled}, Validators.pattern(this.timePattern)]
      });
      (group['examinations'] as FormArray).push(grouptoAdd)
    });
    this.fb = this.formBuilder.group(group);
  }

  get examGroups () {
    return this.fb.get('examinations') as FormArray
  }

  public onRequiredChanged(exam: number) {
    const value = this.examGroups.at(exam).get('required')?.value || false;
    if(!value) {
      this.examGroups.at(exam).patchValue({startedAt: '', finishedAt: ''});
      this.examGroups.at(exam).get('startedAt')?.disable();
      this.examGroups.at(exam).get('finishedAt')?.disable();
    } else {
      this.examGroups.at(exam).get('startedAt')?.enable();
      this.examGroups.at(exam).get('finishedAt')?.enable();
    }
  }

  public onSave(): void {
    if(!this.fb.valid) return;
    if(!this.data.data.patient?._id) return;
    const val = this.fb.value;

    this.consultationService.updatePatient(this.data.id, this.data.data.patient._id, val).subscribe(
      (updatedData) => {
        this.toastr.success('Sikeres mentés');
        this.dialogRef.close(updatedData);
      },
    );
  }

  public onCellDblClick(index: number, field: string): void {
    console.log(index, field);
    const now = new Date().getTime();
    const idx = `${index}${field}`;
    if (! (idx in this.clickTimers)) {
      this.clickTimers[idx] = now;
      return;
    }
    const elapsed = now - this.clickTimers[idx];
    this.clickTimers[idx] = now;
    if (elapsed > 500) {
      return;
    }
    //500msecen belüli.
    const patchObj: any = {};
    patchObj[field] = this.getTimeFromDate('', true);
    if(index > -1) {
      //ismétlődő mező frissült.
      this.examGroups.at(index).patchValue(patchObj);
    } else {
      this.fb.patchValue(patchObj);
    }


  }

  private getTimeFromDate(dateString?: string, getFromCurrent: boolean = false): string {
    let date;
    if (!dateString) {
      if(getFromCurrent) {
        date = new Date();
      } else {
        return '';
      }
    } else {
      date = new Date(dateString);
    }
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }


}
