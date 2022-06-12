import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { ToastrModule } from 'ngx-toastr';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultationsComponent } from './page/consultations/consultations.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ExaminationsComponent } from './page/examinations/examinations.component';
import { ExaminationGroupsComponent } from './page/examination-groups/examination-groups.component';
import { IconNavbarSidenavComponent } from './common/icon-navbar-sidenav/icon-navbar-sidenav.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { TopbarComponent } from './common/topbar/topbar.component';
import { UsersComponent } from './page/users/users.component';
import { PatientsComponent } from './page/patients/patients.component';
import { LoginComponent } from './page/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    IconNavbarSidenavComponent,
    DashboardComponent,
    PatientsComponent,
    UsersComponent,
    ExaminationsComponent,
    ExaminationGroupsComponent,
    ConsultationsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,

    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    })
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
