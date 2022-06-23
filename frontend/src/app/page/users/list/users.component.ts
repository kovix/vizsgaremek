import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { ButtonDefinition } from 'src/app/model/genericTable/button-definition';
import { ColumnDefinition } from 'src/app/model/genericTable/column-definition';
import { CustomButtonEvent } from 'src/app/model/genericTable/custom-button-event';
import { User } from 'src/app/model/user';
import { AppConfigService } from 'src/app/service/app-config.service';
import { UserService } from 'src/app/service/backend/user.service';
import { DeleteWrapperService } from 'src/app/service/delete-wrapper.service';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$?: Observable<User[]>;
  refreshUser$ = new BehaviorSubject<boolean>(true);

  public columnDefinition: ColumnDefinition[] = this.configService.userColumnDefinition;
  public actionButtons: ButtonDefinition[] = this.configService.UserActionButtons;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private configService: AppConfigService,
    private deleteWrapper: DeleteWrapperService,
  ) {}

  ngOnInit(): void {
    this.users$ = this.refreshUser$.pipe(switchMap(_ => this.userService.getAll()));
  }

  onCustomButtonClicked(evt: CustomButtonEvent): void {
    switch (evt.eventID) {
      case 'EDIT':
        this.openDialogWrapper(evt.entityID);
        break;
      case 'CREATE':
        this.openDialogWrapper(null);
        break;
      case 'DELETE':
        this.onDelete(evt.entityID);
        break;
      default:

    }
  }

  private openDialogWrapper(patient: string | null): void {
    if (!patient) {
      this.openDialog(new User());
      return;
    }

    this.userService.get(patient).pipe(take(1)).subscribe(
      (result) => this.openDialog(result)
    );

  }

  private openDialog(user: User) {
    const dialogConfig = this.configService.prepareMatDialogConfig(true, user);
    const dialogRef = this.dialog.open(UserEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data) => {
        if(data) this.refreshUser$.next(true);
      }
    );
  }

  private onDelete(user: string): void {
    this.userService.get(user).pipe(take(1)).subscribe(
      (result) => this.deleteWrapper.delConfirmation(result._id, `${result.userName} (${result.firstName} ${result.lastName})`).subscribe(
        (confirmationresultId) => this.deleteEntity(confirmationresultId)
      )
    );
  }


  private deleteEntity(id: string): void {
    if (!id) return;

    this.userService.delete(id).subscribe(
      (response) => {
        this.deleteWrapper.displayDeletedToastr(response.name);
        this.refreshUser$.next(true);
      }
    )
  }

}
