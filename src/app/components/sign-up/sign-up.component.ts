import { Component, OnInit } from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {assignValidations} from '../../utils/util-functions';
import {ToastsService} from '../../services/toasts.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formModel: DynamicFormModel = [];
  formGroup: FormGroup = new FormGroup({});
  error: any;

  constructor(private dfs: DynamicFormService, public http: HttpClient, private authService: AuthService,
              private router: Router, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.http.get<any[]>('assets/forms/sign-up.json').subscribe((formModelJson: any) => {
      this.formModel = this.dfs.fromJSON(formModelJson);
      this.formGroup = this.dfs.createFormGroup(this.formModel);
    });
  }
  signUp1 = (e: any) => {
    e.preventDefault();
    if (this.formGroup.valid) {
      this.authService.signup(this.formGroup.value).subscribe(
        success => this.router.navigate(['/candidate/create']).then(() => window.location.reload()),
        errorObj => {
          Object.keys(errorObj.error).forEach((key) => {
            this.toastService.error({title: key, text: errorObj.error[key]});
          });
        });
    } else {
      this.formGroup.markAllAsTouched();
      this.dfs.detectChanges();
      assignValidations(this.formModel);
    }
  }

}
