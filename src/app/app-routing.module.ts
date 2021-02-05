import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdminComponent} from './components/admin/admin.component';
import {CandidateCreateComponent} from './components/candidate/candidate-create/candidate-create.component';
import {CandidateListComponent} from './components/admin/candidate-list/candidate-list.component';
import {AdminGuard} from './guards/auth-guard.guard';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {CandidateDetailsComponent} from './components/admin/candidate-details/candidate-details.component';
import {SuccessApplicationComponent} from './components/success-application/success-application/success-application.component';
import {CandidateComponent} from './components/candidate/candidate.component';
const routes: Routes = [
  { path: '', redirectTo: 'candidate/create', pathMatch: 'full' },
  {
    path: 'candidate',
    component: CandidateComponent,
    children: [
      {
        path: 'create',
        component: CandidateCreateComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'success',
        component: SuccessApplicationComponent,
        canActivate: [AdminGuard]
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'candidate/list',
        component: CandidateListComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'candidate/details/:id',
        component: CandidateDetailsComponent,
        canActivate: [AdminGuard]
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
