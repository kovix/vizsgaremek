import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Renderer2, Inject, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, retry, take } from 'rxjs';
import { Consultation, IConsultationDetail } from 'src/app/model/consultation';
import { AppConfigService } from 'src/app/service/app-config.service';
import { ConsultationService } from 'src/app/service/backend/consultation.service';
import { ConsultationAddPatientComponent } from '../consultation-add-patient/consultation-add-patient.component';
import { ConsultationEditDetailsComponent } from '../consultation-edit-details/consultation-edit-details.component';
import { WebsocketService } from 'src/app/service/backend/websocket.service';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.scss'],
  providers: [WebsocketService]
})
export class ConsultationDetailsComponent implements OnInit, OnDestroy {

  private routeBase = 'consultations';

  public isFullscreen: boolean = false;
  public isFinishedVisible: boolean = true;
  public consultation?: Consultation;
  public now: Date = new Date();
  private elapsedTimer: any;

  private consId: string = '';

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
    private websocketService: WebsocketService,
  ) {
    websocketService.websocket.pipe(
      retry() //support auto reconnect
    ).subscribe(msg => {
      if (msg.source !== this.websocketService.myId) {
        try {
          const data = JSON.parse(msg.content);
          if (data && data?.cmd === 'Refresh') {
            this.getData();
          }

        } catch(e) {
          console.log('Error parsing response from ws');
        }
      }

    });
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'setalo-body');

    this.elapsedTimer = setInterval((() => {
      this.now = new Date();
    }).bind(this), 1000)

    this.id.subscribe((id) => {
      if (id === '') {
        this.toastr.warning('A rendelés nem található!');
        this.navBack();
        return;
      }
      this.consId = id;
      this.getData();
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'setalo-body');
    this.renderer.removeClass(this.document.body, 'g-sidenav-pinned');
    clearInterval(this.elapsedTimer);
  }

  private getData(): void {
    this.consultationService.get(this.consId).pipe(take(1)).subscribe({
      next: (foundConsultation) => {
        if (!foundConsultation) {
          this.toastr.warning('Nincs ilyen rendelés!');
          this.navBack();
          return;
        }
        this.consultation = foundConsultation;
      },
      error: (error) => {
        this.toastr.warning('A rendelés nem található!');
        this.navBack()
      }

    });
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  public fullscreenmodes() {
    this.chkScreenMode();
  }

  chkScreenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullscreen = true;
    } else {
      //not in full screen
      this.isFullscreen = false;
    }
  }

  openFullscreen() {
    this.document.documentElement.requestFullscreen();
  }
/* Close fullscreen */
  closeFullscreen() {
    this.document.exitFullscreen();

  }

  onToggleFullScreen(): void {
    if(this.isFullscreen) {
      this.closeFullscreen();
    }  else {
      this.openFullscreen();
    }
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
        this.isFinishedVisible = !this.isFinishedVisible;
        break;
      default:
    }
  }

  public openEditDialog(data: IConsultationDetail): void {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, { id: this.consultation?._id, data: data });
    const dialogRef = this.dialog.open(ConsultationEditDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) this.consultation = data;
        this.sendRefreshInfo();
      }
    );
  }

  private openDialog() {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, {});
    dialogConfig.panelClass = 'dialog-responsive-big';
    const dialogRef = this.dialog.open(ConsultationAddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (!this.consultation?._id) return;
        if (!data || !data?.length) return;
        this.consultationService.addPatients(this.consultation._id, data).subscribe(
          (updatedEntity) => {
            this.toastr.success('A páciensek hozzáadása megtörtént!');
            this.consultation = updatedEntity;
            this.sendRefreshInfo();
            //TODO: Ha csak egy beteget választ ki, érdemes lenne felnyitni egyből a szerkesztés dialogot.
          }
        );
      }
    );
  }

  private sendRefreshInfo(): void {
    const messageData = {
      source: this.websocketService.myId,
      content: JSON.stringify({cmd: 'Refresh'}),
    };
    this.websocketService.websocket.next(messageData);
  }

  private navBack(): void {
    this.router.navigate([this.routeBase]);
  }

}
