import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Examination } from 'src/app/model/examination';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { ExaminationService } from 'src/app/service/backend/examination.service';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.scss']
})
export class ExaminationsComponent implements OnInit {

  examinations$?: Observable<Examination[]>;
  refreshExaminations$ = new BehaviorSubject<boolean>(true);

  public columnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'Név',
      column: 'name',
    }),
    new ColumnDefinition({
      title: 'Alapértelmezett idő',
      column: 'defaultTime',
    }),
    new ColumnDefinition({
      title: 'Létrehozva',
      column: 'createdAt',
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt'
    }),
  ];

  public actionButtons: ButtonDefinition[] = [

    {
      title: 'Szerkesztés',
      icon: 'fa-pencil text-primary',
      eventId: 'EDIT',
    },
    {
      title: 'Törlés',
      icon: ' fa-trash text-danger',
      eventId: 'DELETE',
    },
  ];

  constructor(
    private examinationService: ExaminationService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.examinations$ = this.refreshExaminations$.pipe(switchMap(_ => this.examinationService.getAll()));
  }

  onCustomButtonClicked(evt: CustomButtonEvent):void {
    switch(evt.eventID) {
      case 'DETAILS':
        this.toastr.success(`Got event ${evt.eventID} for product ${evt.eventID}`, 'This is a message', {
          positionClass: 'toast-bottom-right'
        });
        break;
      case 'EDIT':
      case 'CREATE':
        //this.router.navigate([`/${this.routeBase}/edit`, evt.entityID]);
        break;
      case 'DELETE':
       //this.onDeleteProduct(evt);
        break;
      case 'NEWORDER':
        //this.onCreateOrderForProduct(evt.entityID);
        break;
      default:
        this.toastr.warning(`Got event ${evt.eventID} for entity ${evt.entityID}`, 'Unknown event received', {
          positionClass: 'toast-bottom-right'
        });
    }
  }

}
