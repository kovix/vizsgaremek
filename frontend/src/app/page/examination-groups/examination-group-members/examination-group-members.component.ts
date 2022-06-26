import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ExaminationGroup, ExaminationsInGroup } from 'src/app/model/examination-group';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ExaminationGroupService } from 'src/app/service/backend/examination-group.service';
import { DeleteWrapperService } from 'src/app/service/delete-wrapper.service';
import { AddExaminationToGroupComponent } from '../add-examination-to-group/add-examination-to-group.component';

@Component({
  selector: 'app-examination-group-members',
  templateUrl: './examination-group-members.component.html',
  styleUrls: ['./examination-group-members.component.scss']
})
export class ExaminationGroupMembersComponent implements OnInit {

  private routeBase = 'examination-groups';

  id: Observable<string> = this.activatedRoute.params.pipe(
    map(params => params['id'])
  );

  public examinationGroup!: ExaminationGroup;

  constructor(
    private examinationGroupService: ExaminationGroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private configService: AppConfigService,
    private deleteWrapper: DeleteWrapperService
  ) { }

  ngOnInit(): void {
    this.id.subscribe((id) => {
      if (id === '') {
        this.navBack();
        return;
      }
      this.examinationGroupService.get(id).subscribe({
        next: (foundExamination) => {
          this.examinationGroup = foundExamination;
        },
        error: (error) => {
          this.navBack()
        }

      });
    });
  }

  public onAdd(): void {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, this.examinationGroup.examinations);
    const dialogRef = this.dialog.open(AddExaminationToGroupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (!Array.isArray(data)) return;
        this.examinationGroupService.addExaminations(this.examinationGroup._id, data).pipe(take(1)).subscribe(
          (result) => {
            this.examinationGroup = result;
            this.toastr.success('A vizsgálatok hozzáadása megtörtént.');
          }
        )
      }
    );

  }

  public onDeleteExamination(examination: ExaminationsInGroup): void {
    this.deleteWrapper.delConfirmation(examination?.examination?._id || '', examination?.examination?.name || '').pipe(take(1)).subscribe(
      (confirmationresultId) => {
        if (confirmationresultId) this.removeExamination(confirmationresultId);
      }
    )
  }

  public onReorder(examination: ExaminationsInGroup, direction: number): void {
    if (!this.examinationGroup.examinations) return;
    const me: number = this.examinationGroup.examinations.findIndex((item) => item.examination?._id === examination.examination?._id) || 0;
    const maxItemNo: number = this.examinationGroup.examinations.length;
    let newItems = [];
    if (me === 0 && direction === -1) {
      this.toastr.warning('Nem mozgathatja felfelé ezt a vizsgálatot!');
      return;
    }
    if (me === maxItemNo - 1 && direction === 1) {
      this.toastr.warning('Nem mozhathatja lefelé ezt a sort.');
      return;
    }

    [
      this.examinationGroup.examinations[me].order,
      this.examinationGroup.examinations[me + direction].order
    ] = [
        this.examinationGroup.examinations[me + direction].order,
        this.examinationGroup.examinations[me].order
      ];


    newItems = this.examinationGroup.examinations
      .sort((a, b) => a.order - b.order)
      .map((item) => item.examination!._id);

      this.examinationGroupService.saveNewOrder(this.examinationGroup._id, newItems).pipe(take(1)).subscribe(
        (result) => {
          this.examinationGroup = result;
          this.toastr.success('A vizsgálatok átrendezése megtörtént.');
        }
      )
  }

  private removeExamination(confirmationresultId: string): void {
    this.examinationGroupService.removeExamination(this.examinationGroup._id, confirmationresultId).pipe(take(1)).subscribe(
      (result) => {
        this.toastr.success('A vizsgálatok törlése megtörtént.');
        this.examinationGroup = result;
      }
    );
  }

  private navBack(): void {
    this.router.navigate([this.routeBase]);
  }

}
