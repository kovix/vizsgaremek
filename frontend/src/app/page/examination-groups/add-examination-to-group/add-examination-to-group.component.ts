import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { Examination } from 'src/app/model/examination';
import { ExaminationService } from 'src/app/service/backend/examination.service';

@Component({
  selector: 'app-add-examination-to-group',
  templateUrl: './add-examination-to-group.component.html',
  styleUrls: ['./add-examination-to-group.component.scss']
})
export class AddExaminationToGroupComponent {

  public examinations$?: Observable<Examination[]> = this.examinationService.getAll();
  public selectedOptions: string[] = [];

  //@Inject(MAT_DIALOG_DATA) public existingItems: any,
  constructor(
    private examinationService: ExaminationService,
  ) { }


  public onSave() {
    console.log(this.selectedOptions);
  }

}
