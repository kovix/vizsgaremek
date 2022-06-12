import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthServiceService,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.loginForm = this.initLoginFormGroup();
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }


  public onSubmit():void {
    if (!this.loginForm.valid) {
      this.toastr.warning('A bejelentkezés nem lehetséges, mert az űrlap hibákat tartalmaz');
      return;
    }

    const result = Object.assign({}, this.loginForm.value);
    if (result.rememberMe) {
      this.authService.setStoredUserName(result.userName);
    }
    console.log(result);
    this.loginService.login(result.userName, result.password).subscribe({
      next: (result) => {
        //TODO: Also Propagate user data
        this.authService.saveToken(result);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error.statusText;
        this.toastr.error(`${errorMessage} (${error.status})`);
      },
    })


  }

  private initLoginFormGroup(): FormGroup {
    return this.formBuilder.group({
      userName: [this.authService.getStoredUserName(), Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

}
