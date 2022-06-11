import { Injectable } from '@angular/core';

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

  constructor() {}
}
