import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Consultation } from 'src/app/model/consultation';
import { ExaminationGroup } from 'src/app/model/examination-group';
import { User } from 'src/app/model/user';
import { ConsultationService } from 'src/app/service/backend/consultation.service';
import { ExaminationGroupService } from 'src/app/service/backend/examination-group.service';
import { UserService } from 'src/app/service/backend/user.service';

@Component({
  selector: 'app-consultation-create-dialog',
  templateUrl: './consultation-create-dialog.component.html',
  styleUrls: ['./consultation-create-dialog.component.scss']
})
export class ConsultationCreateDialogComponent implements OnInit {

  public title: string = '';
  public fb!: FormGroup;

  public doctors$ = this.userService.getAll();
  public examinationGroup$ = this.examinationGroupService.getAll();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Consultation,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef <ConsultationCreateDialogComponent>,
    private consultationService: ConsultationService,
    private userService: UserService,
    private examinationGroupService: ExaminationGroupService,
  ) { }


//,
//Validators.pattern(/^\d{4}\. \d{2}\. \d{2}\.$/)

  ngOnInit(): void {
    this.title = this.data._id ? `${this.data.name} módosítása` : 'Új rendelés';
    console.log(this.data);
    this.fb = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      startDate: [this.data.startDate,  Validators.required],
      doctor: [
        typeof this.data.doctor === "string" || !this.data.doctor ? this.data.doctor : (this.data.doctor as User)._id,
        Validators.required
      ],
      groupId: [
        typeof this.data.groupId === "string" || !this.data.groupId ? this.data.groupId : (this.data.groupId as ExaminationGroup)._id,
        Validators.required
      ],
    })
  }

  saveConsultation(): void {
    //const result = Object.assign({}, this.fb.value);
    if(!this.fb.valid) return; //should not reach here, because btn is disabled.
    const result = Object.assign({}, this.fb.value);
    result.startDate = result.startDate.toLocaleDateString();
    //const origData = Object.assign({}, this.data);
    const method = this.data._id === '' ? 'create' : 'update';

    if (method === "update") result._id = this.data._id;

    this.consultationService[method](result).subscribe(
      _ => {
        this.toastr.success('Sikeres mentés!');
        this.fb.reset();
        this.dialogRef.close(true);

    });
  }

}
