import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/backend/patient.service';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.scss']
})
export class PatientDialogComponent implements OnInit {

  public title: string = '';
  public fb!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Patient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef <PatientDialogComponent>,
    private examintaionService: PatientService,
  ) { }

  ngOnInit(): void {
    this.title = this.data._id ? `${this.data.firstName} ${this.data.lastName} módosítása` : 'Új paciens';
    this.fb = this.formBuilder.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      patientID: [this.data.patientID, [
        Validators.required,
        Validators.pattern(/^$|^\d{3} \d{3} \d{3}$/)
      ]],
      email: [this.data.email, Validators.pattern(/^$|^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/)],
      comment: [this.data.comment],
    })
  }

  public savePatient(): void {
    if(!this.fb.valid) return; //should not reach here, because btn is disabled.
    const result = Object.assign({}, this.fb.value);
    //const origData = Object.assign({}, this.data);
    const method = this.data._id === '' ? 'create' : 'update';

    if (method === "update") result._id = this.data._id;

    this.examintaionService[method](result).subscribe(
      _ => {
        this.toastr.success('Sikeres mentés!');
        this.fb.reset();
        this.dialogRef.close(true);

    });
  }


}
