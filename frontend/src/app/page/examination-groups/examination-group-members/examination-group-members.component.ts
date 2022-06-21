import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
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
    const dialogConfig = this.configService.prepareMatDialogConfig(true, null);
    const dialogRef = this.dialog.open(AddExaminationToGroupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(!Array.isArray(data)) return;
        this.examinationGroupService.addExaminations(this.examinationGroup._id, data).pipe(take(1)).subscribe(
          (result) => {
            this.examinationGroup = result;
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

  private removeExamination(confirmationresultId: string): void {
    this.examinationGroupService.removeExamination(this.examinationGroup._id, confirmationresultId).pipe(take(1)).subscribe(
      (result) => console.log(result)
    );
  }

  private navBack(): void {
    this.router.navigate([this.routeBase]);
  }

}
