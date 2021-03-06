import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {assignValidations} from '../../utils/util-functions';
import {ToastsService} from '../../services/toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel: DynamicFormModel = [];
  formGroup: FormGroup = new FormGroup({});

  constructor(private dfs: DynamicFormService, public http: HttpClient, private authService: AuthService,
              private router: Router, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.http.get<any[]>('assets/forms/login.json').subscribe((formModelJson: any) => {
      this.formModel = this.dfs.fromJSON(formModelJson);
      this.formGroup = this.dfs.createFormGroup(this.formModel);
    });
  }

  login1 = (e: any) => {
    e.preventDefault();
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        success => this.router.navigate(['candidate/create']).then(() => window.location.reload()),
        errorObj => {
          Object.keys(errorObj.error).forEach((key) => {
            this.toastService.error({title: key, text: errorObj.error[key]});
          });
        });
    }else{
      this.formGroup.markAllAsTouched();
      this.dfs.detectChanges();
      assignValidations(this.formModel);
    }
  }
}
