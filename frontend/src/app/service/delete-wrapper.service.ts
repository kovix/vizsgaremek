import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { Observable, of, switchMap } from 'rxjs';

import { DeleteConfirmComponent } from '../common/delete-confirm/delete-confirm.component';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteWrapperService {

  constructor(
    private configService: AppConfigService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  public delConfirmation(id: string, name: string): Observable<string> {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, name);
    const dialogRef = this.dialog.open(DeleteConfirmComponent, dialogConfig);
    return dialogRef.afterClosed().pipe(
      switchMap(response => {
        const responseId = (response === "1") ? id : '';
        return of(responseId);
      })
    );
  }

  public displayDeletedToastr(name: string | null): void {
    const message = (name) ? `A rekord (${name}) sikeresen törölve.` : 'Rekord sikeresen törölve';
    this.toastr.success(message);
  }

}
