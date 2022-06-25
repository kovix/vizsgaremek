import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Consultation } from 'src/app/model/consultation';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ConsultationService } from 'src/app/service/backend/consultation.service';
import { ConsultationAddPatientComponent } from '../consultation-add-patient/consultation-add-patient.component';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.scss']
})
export class ConsultationDetailsComponent implements OnInit, OnDestroy {

  private routeBase = 'consultations';

  public isFullscreen: boolean = false;
  public isFinishedHidden: boolean = false;
  public consultation?: Consultation;

  id: Observable<string> = this.activatedRoute.params.pipe(
    map(params => params['id'])
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private consultationService: ConsultationService,
    private configService: AppConfigService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'setalo-body');

    this.id.subscribe((id) => {
      if (id === '') {
        this.toastr.warning('A rendelés nem található!');
        this.navBack();
        return;
      }
      this.consultationService.get(id).subscribe({
        next: (foundConsultation) => {
          console.log(foundConsultation);
          this.consultation = foundConsultation;
        },
        error: (error) => {
          this.toastr.warning('A rendelés nem található!');
          this.navBack()
        }

      });
    });

  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'setalo-body');
    this.renderer.removeClass(this.document.body, 'g-sidenav-pinned');
  }

  onHeaderButtonClicked(event: string): void {
    switch (event) {
      case 'ADDNEW':
        this.openDialog();
        break;
      case 'TOGGLEFULLSCREEN':
        this.onToggleFullScreen();
        break;
      case 'TOGGLEFINISHED':
        this.isFinishedHidden = !this.isFinishedHidden;
        break;
      default:
    }
  }

  onToggleFullScreen():void {
    this.isFullscreen = !this.isFullscreen;
  }

  private openDialog() {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, {});
    dialogConfig.panelClass = 'dialog-responsive-big';
    const dialogRef = this.dialog.open(ConsultationAddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        console.log(data);
        //if(data) this.refreshConsultations$.next(true);
      }
    );
  }

  private navBack(): void {
    this.router.navigate([this.routeBase]);
  }

}
