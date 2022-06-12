import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ConsultationsComponent } from './page/consultations/consultations.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ExaminationGroupsComponent } from './page/examination-groups/examination-groups.component';
import { ExaminationsComponent } from './page/examinations/examinations.component';
import { LoginComponent } from './page/login/login.component';
import { PatientsComponent } from './page/patients/patients.component';
import { UsersComponent } from './page/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consultations',
    component: ConsultationsComponent,
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
    path: 'patients',
    component: PatientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
