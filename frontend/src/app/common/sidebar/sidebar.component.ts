import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { User } from 'src/app/model/user';
import {
  AppConfigService,
  IMenuItem
} from 'src/app/service/app-config.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { LoginService } from 'src/app/service/login.service';
import { SidebarTogglerService } from 'src/app/service/sidebar-toggler.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  @ViewChild('sideNavMain') sideNavMain!: ElementRef;
  @ViewChild('iconSideNav') iconSideNav!: ElementRef;

  private className: string = 'g-sidenav-pinned';
  private bodyRef = document.querySelector('body');

  public sidebarMenu: IMenuItem[] = this.appConfig.sidebarMenu;
  public user?: User;

  constructor(
    private renderer: Renderer2,
    private togglerService: SidebarTogglerService,
    private appConfig: AppConfigService,
    private authService: AuthServiceService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.togglerService.togglerFired$.subscribe({
      next: this.toggleSidebar.bind(this),
      error: (err) => {
        console.log(err);
      }
    });

    this.authService.userData.subscribe((user) => {
      if (user.userName) {
        this.user = user;
      } else {
        //Trigger user load
        this.loginService.getCurrentUserData().subscribe(
          (userData) => this.authService.setUserData(userData)
        )
      }
    });

  }

  public onHideClick(): void {
    this.togglerService.fireTogger();
  }

  private toggleSidebar(): void {
    if (this.bodyRef?.classList.contains(this.className)) {
      this.renderer.removeClass(document.body, this.className);
      this.renderer.removeClass(this.sideNavMain.nativeElement, 'bg-white');
      this.renderer.removeClass(
        this.sideNavMain.nativeElement,
        'bg-transparent'
      );
    } else {
      this.renderer.addClass(document.body, this.className);
      this.renderer.addClass(this.sideNavMain.nativeElement, 'bg-white');
      this.renderer.addClass(this.sideNavMain.nativeElement, 'bg-transparent');
      this.renderer.removeClass(this.iconSideNav.nativeElement, 'd-none');
    }
  }
}
