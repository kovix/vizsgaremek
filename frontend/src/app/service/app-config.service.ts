import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { ButtonDefinition } from '../model/genericTable/button-definition';
import { ColumnDefinition } from '../model/genericTable/column-definition';

export interface IMenuItem {
  link: string;
  icon: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public sidebarMenu: IMenuItem[] = [
    { link: '/', icon: 'dashboard', title: 'Vezérlőpult' },
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
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt'
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
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt'
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
    }),
    new ColumnDefinition({
      title: 'Módosítva',
      column: 'updatedAt'
    }),

  ];
  public PatientActionButtons: ButtonDefinition[] = this.defaultActionButtons;


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
