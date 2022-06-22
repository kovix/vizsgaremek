import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { Examination } from 'src/app/model/examination';
import { ExaminationsInGroup } from 'src/app/model/examination-group';
import { ExaminationService } from 'src/app/service/backend/examination.service';

@Component({
  selector: 'app-add-examination-to-group',
  templateUrl: './add-examination-to-group.component.html',
  styleUrls: ['./add-examination-to-group.component.scss']
})
export class AddExaminationToGroupComponent {

  public examinations$?: Observable<Examination[]> = this.examinationService.getAll();
  public selectedOptions: string[] = [];

  //
  constructor(
    @Inject(MAT_DIALOG_DATA) public existingItems: ExaminationsInGroup[],
    private examinationService: ExaminationService,
  ) { }
}
