import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { ButtonDefinition } from '../model/genericTable/button-definition';
import { ColumnDefinition } from '../model/genericTable/column-definition';
import { DateConvPipe } from '../pipe/date-conv.pipe';
import { RoleConverterPipe } from '../pipe/role-converter.pipe';

export interface IMenuItem {
  link: string;
  icon: string;
  title: string;
}

export interface iRole {
  id: number,
  name: string,
}

export interface iAlertStatuses {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public sidebarMenu: IMenuItem[] = [
    { link: '/consultations', icon: 'screenshot_monitor', title: 'Sétálólap' },
    { link: '/examinations', icon: 'vaccines', title: 'Vizsgálatok' },
    {
      link: '/examination-groups',
      icon: 'workspaces',
      title: 'Vizsgálatcsoportok'
    },
    { link: '/patients', icon: 'contact_emergency', title: 'Páciensek' },
    { link: '/users', icon: 'assignment_ind', title: 'Felhasználók' }
  ];

  public defaultActionButtons: ButtonDefinition[] = [
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

  //Table examination
  public ExaminationcolumnDefinition: ColumnDefinition[] = [
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
      pipe: DateConvPipe
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt',
      pipe: DateConvPipe
    }),
  ];
  public ExaminationActionButtons: ButtonDefinition[] = this.defaultActionButtons;


  //Table examinationGroups
  public ExaminationGroupcolumnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'Név',
      column: 'name',
    }),
    new ColumnDefinition({
      title: 'Létrehozva',
      column: 'createdAt',
      pipe: DateConvPipe,
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt',
      pipe: DateConvPipe
    }),
  ];
  public ExaminationGroupActionButtons: ButtonDefinition[] = [
    {
      title: 'Vizsgálatok',
      icon: ' fa-info text-primary',
      eventId: 'DETAILS',
    },
    ...this.defaultActionButtons
  ];

  //Table patients
  public PatientcolumnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'Vezetéknév',
      column: 'firstName',
    }),
    new ColumnDefinition({
      title: 'Keresztnév',
      column: 'lastName',
    }),
    new ColumnDefinition({
      title: 'TAJ',
      column: 'patientID',
    }),
    new ColumnDefinition({
      title: 'Email',
      column: 'email',
    }),
    new ColumnDefinition({
      title: 'Létrehozva',
      column: 'createdAt',
      pipe: DateConvPipe,
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt',
      pipe: DateConvPipe,
    }),
  ];
  public PatientActionButtons: ButtonDefinition[] = this.defaultActionButtons;

  //Table patients
  public userColumnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'Felhasználónév',
      column: 'userName',
    }),
    new ColumnDefinition({
      title: 'Vezetéknév',
      column: 'firstName',
    }),
    new ColumnDefinition({
      title: 'Keresztnév',
      column: 'lastName',
    }),
    new ColumnDefinition({
      title: 'Email',
      column: 'email',
    }),
    new ColumnDefinition({
      title: 'Szerep',
      column: 'role',
      pipe: RoleConverterPipe,
    }),
    new ColumnDefinition({
      title: 'Létrehozva',
      column: 'createdAt',
      pipe: DateConvPipe
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt',
      pipe: DateConvPipe,
    }),

  ];
  public UserActionButtons: ButtonDefinition[] = this.defaultActionButtons;

  //Table patients
  public consultationColumnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'Rendelés',
      column: 'name',
    }),
    new ColumnDefinition({
      title: 'Dátum',
      column: 'startDate',
      pipe: DateConvPipe,
    }),
    new ColumnDefinition({
      title: 'Rendel vezetéknév',
      column: 'doctor.firstName',
    }),
    new ColumnDefinition({
      title: 'Rendel keresztnév',
      column: 'doctor.lastName',
    }),
    new ColumnDefinition({
      title: 'Vizsgálatok',
      column: 'groupId.name',
    }),
  ];
  public consultationActionButtons: ButtonDefinition[] = [
    {
      title: 'Lebonyolítás',
      icon: ' fa-info text-primary',
      eventId: 'DETAILS',
    },
    ...this.defaultActionButtons
  ];

  //Table patients
  public PatientSelectorcolumnDefinition: ColumnDefinition[] = [
    new ColumnDefinition({
      title: 'Vezetéknév',
      column: 'firstName',
    }),
    new ColumnDefinition({
      title: 'Keresztnév',
      column: 'lastName',
    }),
    new ColumnDefinition({
      title: 'TAJ',
      column: 'patientID',
    })
  ];
  public PatientSelectorActionButtons: ButtonDefinition[] = [];

  public Roles: iRole[] = [
    { id: 1, name: 'Ügyintéző' },
    { id: 2, name: 'Asszisztens' },
    { id: 3, name: 'Orvos' },
    { id: 4, name: 'Adminisztrátor' },
  ];

  public alertStatuses: iAlertStatuses[] = [
    {id: 0, name: 'Nincs riasztás'},
    {id: 1, name: 'Alacsony riasztás'},
    {id: 2, name: 'Magas riasztás'},
  ];

  constructor() { }

  public prepareMatDialogConfig(disableClose: boolean, data: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = disableClose;
    dialogConfig.panelClass = 'dialog-responsive'
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    return dialogConfig;
  }

}
