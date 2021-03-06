import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { ConsultationDetailsComponent } from './page/consultations/consultation-details/consultation-details.component';
import { ConsultationsComponent } from './page/consultations/list/consultations.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ExaminationGroupMembersComponent } from './page/examination-groups/examination-group-members/examination-group-members.component';
import { ExaminationGroupsComponent } from './page/examination-groups/list/examination-groups.component';
import { ExaminationsComponent } from './page/examinations/list/examinations.component';
import { LoginComponent } from './page/login/login.component';
import { PatientsComponent } from './page/patients/list/patients.component';
import { UsersComponent } from './page/users/list/users.component';

const routes: Routes = [

  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: ConsultationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'consultations',
        component: ConsultationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'consultations/:id',
        component: ConsultationDetailsComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'examinations',
        component: ExaminationsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'examination-groups',
        component: ExaminationGroupsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'examination-groups/details/:id',
        component: ExaminationGroupMembersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
      },
    ],
  },

  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
    ]
  },
  { path: '**', redirectTo: 'consultations', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
