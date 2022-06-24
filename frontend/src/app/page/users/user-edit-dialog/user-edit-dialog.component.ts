import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AppConfigService, iRole } from 'src/app/service/app-config.service';
import { UserService } from 'src/app/service/backend/user.service';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  public title: string = '';
  public fb!: FormGroup;
  public roles: iRole[] = this.configService.Roles;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef <UserEditDialogComponent>,
    private userService: UserService,
    private configService: AppConfigService
  ) { }

  ngOnInit(): void {
    this.title = this.data._id ? `${this.data.firstName} ${this.data.lastName} módosítása` : 'Új felhasználó';
    this.fb = this.formBuilder.group({
      userName: [this.data.userName, Validators.required],
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      password: [this.data.password],
      confirmPassword: [this.data.confirmPassword],
      email: [this.data.email, Validators.pattern(/^$|^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/)],
      role: [this.data.role, Validators.required],
    })
  }

  public savePatient(): void {
    if(!this.fb.valid) return;
    const result = Object.assign({}, this.fb.value);

    if (result.password !== '' && result.password !== result.confirmPassword) {
      this.toastr.warning('Az adatok nem menthetőek, a két jelszó eltér egymástól.');
      return;
    }

    const method = this.data._id === '' ? 'create' : 'update';
    if (method === "update") result._id = this.data._id;

    if (method === 'create' && result.password === '') {
      this.toastr.warning('Új felhasználó létrehozása esetén a jelszó megadása kötelező.');
      return;
    }

    this.userService[method](result).subscribe(
      _ => {
        this.toastr.success('Sikeres mentés!');
        this.fb.reset();
        this.dialogRef.close(true);

    });
  }

}
