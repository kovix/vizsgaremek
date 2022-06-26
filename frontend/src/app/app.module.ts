import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

import { ToastrModule } from 'ngx-toastr';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultationsComponent } from './page/consultations/list/consultations.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ExaminationsComponent } from './page/examinations/list/examinations.component';
import { ExaminationGroupsComponent } from './page/examination-groups/list/examination-groups.component';
import { IconNavbarSidenavComponent } from './common/icon-navbar-sidenav/icon-navbar-sidenav.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { TopbarComponent } from './common/topbar/topbar.component';
import { UsersComponent } from './page/users/list/users.component';
import { PatientsComponent } from './page/patients/list/patients.component';
import { LoginComponent } from './page/login/login.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { BaseListComponent} from './common/base-list/base-list.component';
import { ListColumnSelectorComponent } from './common/base-list/list-column-selector/list-column-selector.component';
import { FilterPipe } from './pipe/filter.pipe';
import { SortPipe } from './pipe/sort.pipe';
import { PaginateBaseListPipe } from './pipe/paginate-base-list.pipe';
import { BaseListTheadComponent } from './common/base-list/base-list-thead/base-list-thead.component';
import { BaseListIconComponent } from './common/base-list/base-list-icon/base-list-icon.component';
import { BaseListRowComponent } from './common/base-list/base-list-row/base-list-row.component';
import { ExaminationDialogComponent } from './page/examinations/examination-dialog/examination-dialog.component';
import { DeleteConfirmComponent } from './common/delete-confirm/delete-confirm.component';
import { ExaminationGroupDialogComponent } from './page/examination-groups/examination-group-dialog/examination-group-dialog.component';
import { ExaminationGroupMembersComponent } from './page/examination-groups/examination-group-members/examination-group-members.component';
import { AddExaminationToGroupComponent } from './page/examination-groups/add-examination-to-group/add-examination-to-group.component';
import { FilterAddExaminationPipe } from './pipe/filter-add-examination.pipe';
import { PatientDialogComponent } from './page/patients/patient-dialog/patient-dialog.component';
import { UserEditDialogComponent } from './page/users/user-edit-dialog/user-edit-dialog.component';
import { ConsultationCreateDialogComponent } from './page/consultations/consultation-create-dialog/consultation-create-dialog.component';
import { UserRoleFilterPipe } from './pipe/user-role-filter.pipe';
import { ConsultationDetailsComponent } from './page/consultations/consultation-details/consultation-details.component';
import { ConsultationDetailButtonsComponent } from './page/consultations/consultation-detail-buttons/consultation-detail-buttons.component';
import { ConsultationAddPatientComponent } from './page/consultations/consultation-add-patient/consultation-add-patient.component';
import { ConsultationEditDetailsComponent } from './page/consultations/consultation-edit-details/consultation-edit-details.component';
import { DateToHHMMPipe } from './pipe/date-to-hhmm.pipe';
import { ElapsedPipePipe } from './pipe/elapsed-pipe.pipe';
import { ElapsedTimeComponent } from './page/consultations/elapsed-time/elapsed-time.component';
import { ShowLeavedPatientsPipe } from './pipe/show-leaved-patients.pipe';
import { LogoutDialogComponent } from './common/logout-dialog/logout-dialog.component';
import { FindExaminationNamePipe } from './pipe/find-examination-name.pipe';

registerLocaleData(localeHu);
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
    LoginComponent,
    AppLayoutComponent,
    LoginLayoutComponent,
    BaseListComponent,
    ListColumnSelectorComponent,
    FilterPipe,
    SortPipe,
    PaginateBaseListPipe,
    BaseListTheadComponent,
    BaseListIconComponent,
    BaseListRowComponent,
    ExaminationDialogComponent,
    DeleteConfirmComponent,
    ExaminationGroupDialogComponent,
    ExaminationGroupMembersComponent,
    AddExaminationToGroupComponent,
    FilterAddExaminationPipe,
    PatientDialogComponent,
    UserEditDialogComponent,
    ConsultationCreateDialogComponent,
    UserRoleFilterPipe,
    ConsultationDetailsComponent,
    ConsultationDetailButtonsComponent,
    ConsultationAddPatientComponent,
    ConsultationEditDetailsComponent,
    DateToHHMMPipe,
    ElapsedPipePipe,
    ElapsedTimeComponent,
    ShowLeavedPatientsPipe,
    LogoutDialogComponent,
    FindExaminationNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    MatCheckboxModule,

    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    TooltipModule.forRoot(),
  ],
  providers: [
    authInterceptorProviders,
    { provide: MAT_DATE_LOCALE, useValue: 'hu-HU' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
