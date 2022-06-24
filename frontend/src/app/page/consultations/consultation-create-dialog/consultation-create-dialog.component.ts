import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Consultation } from 'src/app/model/consultation';
import { ConsultationService } from 'src/app/service/backend/consultation.service';

@Component({
  selector: 'app-consultation-create-dialog',
  templateUrl: './consultation-create-dialog.component.html',
  styleUrls: ['./consultation-create-dialog.component.scss']
})
export class ConsultationCreateDialogComponent implements OnInit {

  public title: string = '';
  public fb!: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Consultation,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef <ConsultationCreateDialogComponent>,
    private consultationService: ConsultationService,
  ) { }

  ngOnInit(): void {
    this.title = this.data._id ? `${this.data.name} módosítása` : 'Új rendelés';
    this.fb = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      startDate: [this.data.startDate, Validators.required],
      doctor: [this.data.doctor, Validators.required],
      groupId: [this.data.groupId, Validators.required],
    })
  }

  saveConsultation(): void {

  }

}
