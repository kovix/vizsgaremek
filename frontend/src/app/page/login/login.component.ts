import { Component,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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


  public onSubmit():void {
    if (!this.loginForm.valid) {
      this.toastr.warning('A bejelentkezés nem lehetséges, mert az űrlap hibákat tartalmaz');
      return;
    }

    const result = Object.assign({}, this.loginForm.value);
    if (result.rememberMe) {
      this.authService.setStoredUserName(result.userName);
    } else {
      this.authService.removeStoredUserName();
    }
    this.loginService.login(result.userName, result.password).subscribe({
      next: (result) => {
        this.authService.saveToken(result);
        this.router.navigate(['/consultations']);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error.statusText;
        this.toastr.error(`${errorMessage} (${error.status})`);
      },
    })


  }

  private initLoginFormGroup(): FormGroup {
    const storedUserName = this.authService.getStoredUserName();
    return this.formBuilder.group({
      userName: [storedUserName, Validators.required],
      password: ['', Validators.required],
      rememberMe: [!!storedUserName],
    });
  }

}
