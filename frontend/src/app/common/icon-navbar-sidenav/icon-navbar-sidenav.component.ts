import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-icon-navbar-sidenav',
  templateUrl: './icon-navbar-sidenav.component.html',
  styleUrls: ['./icon-navbar-sidenav.component.scss']
})
export class IconNavbarSidenavComponent implements OnInit {

  @ViewChild('sideNavMain') sideNavMain!:ElementRef;

  private className: string = "g-sidenav-pinned";
  private bodyRef = document.querySelector('body');

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  public onTogglerClick() {
    debugger;
    // if (this.bodyRef?.classList.contains(this.className)) {
    //   this.renderer.removeClass(document.body, this.className)
    //   setTimeout(function() {
    //     sidenav.classList.remove('bg-white');
    //   }, 100);
    //   sidenav.classList.remove('bg-transparent');

    // } else {
    //   body.classList.add(className);
    //   sidenav.classList.add('bg-white');
    //   sidenav.classList.remove('bg-transparent');
    //   iconSidenav.classList.remove('d-none');
    // }

  }

  /* function toggleSidenav() {

    if (body.classList.contains(className)) {
      body.classList.remove(className);
      setTimeout(function() {
        sidenav.classList.remove('bg-white');
      }, 100);
      sidenav.classList.remove('bg-transparent');

    } else {
      body.classList.add(className);
      sidenav.classList.add('bg-white');
      sidenav.classList.remove('bg-transparent');
      iconSidenav.classList.remove('d-none');
    }
  } */


}
