import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/service/app-config.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { LoginService } from 'src/app/service/login.service';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  constructor(
    private configService: AppConfigService,
    private authService: AuthServiceService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}

  public onLogout(): void {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, {});
    const dialogRef = this.dialog.open(LogoutDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data === 'true') {
          this.loginService.logout().subscribe(
            _ => {
              this.toastr.success('Sikeresen kijelentkezett!');
              this.authService.logOut();
            }
          );
        }
      }
    );
  }
}


