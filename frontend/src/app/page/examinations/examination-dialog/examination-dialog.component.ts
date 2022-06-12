import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Examination } from 'src/app/model/examination';
import { ExaminationService } from 'src/app/service/backend/examination.service';

@Component({
  selector: 'app-examination-dialog',
  templateUrl: './examination-dialog.component.html',
  styleUrls: ['./examination-dialog.component.scss']
})
export class ExaminationDialogComponent implements OnInit {

  public title: string = '';
  public fb!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Examination,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef <ExaminationDialogComponent>,
    private examintaionService: ExaminationService,
  ) { }

  ngOnInit(): void {
    this.title = this.data._id ? `${this.data.name} módosítása` : 'Új vizsgálat';
    console.log(this.data);
    this.fb = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      defaultTime: [this.data.defaultTime, Validators.required]
    })
  }

  public saveExamination(): void {
    if(!this.fb.valid) return; //should not reach here, because btn is disabled.
    const result = Object.assign({}, this.fb.value);
    const origData = Object.assign({}, this.data);
    const method = origData._id === '' ? 'create' : 'update';
    origData.name = result.name;
    origData.defaultTime = result.defaultTime;
    this.examintaionService[method](origData).subscribe({
      next: (result) => {
        this.toastr.success('Sikeres mentés!');
        this.fb.reset();
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error.statusText;
        this.toastr.error(`${errorMessage} (${error.status})`);
      }
    });


  }

}
