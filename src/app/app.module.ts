import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {DynamicFormsNGBootstrapUIModule} from '@ng-dynamic-forms/ui-ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DynamicFormsCoreModule} from '@ng-dynamic-forms/core';
import {CommonModule} from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import {AuthInterceptor, AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CandidateListComponent } from './components/admin/candidate-list/candidate-list.component';
import { CandidateCreateComponent } from './components/candidate/candidate-create/candidate-create.component';
import {AdminGuard} from './guards/auth-guard.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CandidateService} from './services/candidates.service';
import {DataTablesModule} from 'angular-datatables';
import { CandidateDetailsComponent } from './components/admin/candidate-details/candidate-details.component';
import { SuccessApplicationComponent } from './components/success-application/success-application/success-application.component';
import {ToastsService} from './services/toasts.service';
import { CandidateComponent } from './components/candidate/candidate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    CandidateListComponent,
    CandidateCreateComponent,
    SignUpComponent,
    CandidateDetailsComponent,
    SuccessApplicationComponent,
    CandidateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DynamicFormsNGBootstrapUIModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    HttpClientModule,
    DataTablesModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    NgbActiveModal,
    AuthService,
    ToastsService,
    AdminGuard,
    CandidateService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
