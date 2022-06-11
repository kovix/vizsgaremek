import { Component, OnInit } from '@angular/core';
import { SidebarTogglerService } from 'src/app/service/sidebar-toggler.service';

@Component({
  selector: 'app-icon-navbar-sidenav',
  templateUrl: './icon-navbar-sidenav.component.html',
  styleUrls: ['./icon-navbar-sidenav.component.scss']
})
export class IconNavbarSidenavComponent implements OnInit {

  constructor(private togglerService: SidebarTogglerService) { }

  ngOnInit(): void {
  }

  public onTogglerClick() {
    this.togglerService.fireTogger();
  }

}
