import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { TopbarComponent } from './common/topbar/topbar.component';
import { IconNavbarSidenavComponent } from './common/icon-navbar-sidenav/icon-navbar-sidenav.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { PatientsComponent } from './page/patients/patients.component';
import { UsersComponent } from './page/users/users.component';
import { ExaminationsComponent } from './page/examinations/examinations.component';
import { ExaminationGroupsComponent } from './page/examination-groups/examination-groups.component';
import { ConsultationsComponent } from './page/consultations/consultations.component';

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
    ConsultationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
