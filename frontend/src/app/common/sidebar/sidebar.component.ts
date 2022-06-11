import { Component, OnInit, ViewEncapsulation, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { SidebarTogglerService } from 'src/app/service/sidebar-toggler.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  @ViewChild('sideNavMain') sideNavMain!:ElementRef;
  @ViewChild('iconSideNav') iconSideNav!:ElementRef;

  private className: string = "g-sidenav-pinned";
  private bodyRef = document.querySelector('body');

  constructor(
    private renderer: Renderer2,
    private togglerService: SidebarTogglerService
  ) { }

  ngOnInit(): void {
    this.togglerService.togglerFired$.subscribe({
      next: this.toggleSidebar.bind(this),
      error: (err) => {console.log(err)}
    });
  }

  public onHideClick() {
    this.togglerService.fireTogger();
  }

  private toggleSidebar() {
    if (this.bodyRef?.classList.contains(this.className)) {
      this.renderer.removeClass(document.body, this.className)
      this.renderer.removeClass(this.sideNavMain.nativeElement, 'bg-white');
      this.renderer.removeClass(this.sideNavMain.nativeElement, 'bg-transparent');
    } else {
      this.renderer.addClass(document.body, this.className)
      this.renderer.addClass(this.sideNavMain.nativeElement, 'bg-white');
      this.renderer.addClass(this.sideNavMain.nativeElement, 'bg-transparent');
      this.renderer.removeClass(this.iconSideNav.nativeElement, 'd-none');
    }
  }

}
