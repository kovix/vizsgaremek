import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { ToastrModule } from 'ngx-toastr';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';

import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultationsComponent } from './page/consultations/consultations.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ExaminationsComponent } from './page/examinations/list/examinations.component';
import { ExaminationGroupsComponent } from './page/examination-groups/examination-groups.component';
import { IconNavbarSidenavComponent } from './common/icon-navbar-sidenav/icon-navbar-sidenav.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { TopbarComponent } from './common/topbar/topbar.component';
import { UsersComponent } from './page/users/users.component';
import { PatientsComponent } from './page/patients/patients.component';
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
    DeleteConfirmComponent
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

    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    TooltipModule.forRoot(),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
