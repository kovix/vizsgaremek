import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultationsComponent } from './page/consultations/consultations.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ExaminationGroupsComponent } from './page/examination-groups/examination-groups.component';
import { ExaminationsComponent } from './page/examinations/examinations.component';
import { PatientsComponent } from './page/patients/patients.component';
import { UsersComponent } from './page/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'consultations',
    component: ConsultationsComponent
  },
  {
    path: 'examinations',
    component: ExaminationsComponent
  },
  {
    path: 'examination-groups',
    component: ExaminationGroupsComponent
  },
  {
    path: 'patients',
    component: PatientsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
