import { Component, OnInit } from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Candidate} from '../../../interfaces/candidate';
import {CandidateService} from '../../../services/candidates.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {assignValidations, getRandomInt} from '../../../utils/util-functions';
import {ToastsService} from '../../../services/toasts.service';

@Component({
  selector: 'app-candidate-create',
  templateUrl: './candidate-create.component.html',
  styleUrls: ['./candidate-create.component.css']
})
export class CandidateCreateComponent implements OnInit {
  formModel: DynamicFormModel = [];
  formGroup: FormGroup = new FormGroup({});
  filename: string | undefined = '';
  candidate: Candidate | undefined ;
  file: File | undefined;

  constructor(private candidateService: CandidateService, private route: ActivatedRoute, public http: HttpClient,
              private dfs: DynamicFormService, public fb: FormBuilder, private router: Router, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.http.get<any[]>('assets/forms/candidate.json').subscribe((formModelJson: any) => {
      this.formModel = this.dfs.fromJSON(formModelJson);
      this.formGroup = this.dfs.createFormGroup(this.formModel);
    });
  }
  onChange = (event: any) => {
    if (event.$event.target.files && event.$event.target.files.length > 0) {
      this.file = event.$event.target.files[0];
    }
  }
  Apply = () => {
   if (this.formGroup.valid) {
     const formData = new FormData();
     this.formModel.forEach(f => {
       if (f.id === 'cv_file') {
         if (this.file) {
           formData.append(f.id, this.file);
         }
       } else {
         // @ts-ignore
         formData.append(f.id, this.formGroup.get(f.id).value);
       }
     });
     const id = getRandomInt(1000);
     // @ts-ignore
     formData.append('id', id);
     this.candidateService.addCandidate(formData).subscribe((final) => {
       this.router.navigate(['candidate/success']);
     }, errorObj => {
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
