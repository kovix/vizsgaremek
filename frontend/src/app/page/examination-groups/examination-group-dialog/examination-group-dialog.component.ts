import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExaminationGroup } from 'src/app/model/examination-group';
import { ExaminationGroupService } from 'src/app/service/backend/examination-group.service';

@Component({
  selector: 'app-examination-group-dialog',
  templateUrl: './examination-group-dialog.component.html',
  styleUrls: ['./examination-group-dialog.component.scss']
})
export class ExaminationGroupDialogComponent implements OnInit {

  public title: string = '';
  public fb!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ExaminationGroup,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef <ExaminationGroupDialogComponent>,
    private examintaionGroupService: ExaminationGroupService,
  ) { }

  ngOnInit(): void {
    this.title = this.data._id ? `${this.data.name} módosítása` : 'Új csoport';
    this.fb = this.formBuilder.group({
      name: [this.data.name, Validators.required]
    })
  }

  public saveGroup(): void {
    if(!this.fb.valid) return; //should not reach here, because btn is disabled.
    const result = Object.assign({}, this.fb.value);
    const origData = Object.assign({}, this.data);
    const method = origData._id === '' ? 'create' : 'update';
    origData.name = result.name;
    this.examintaionGroupService[method](origData).subscribe(
      (result) => {
        this.toastr.success('Sikeres mentés!');
        this.fb.reset();
        this.dialogRef.close(true);
    });
  }

}
