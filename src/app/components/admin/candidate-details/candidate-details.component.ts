import { Component, OnInit } from '@angular/core';
import {CandidateService} from '../../../services/candidates.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Candidate} from '../../../interfaces/candidate';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {

  formModel: DynamicFormModel = [];
  formGroup: FormGroup = new FormGroup({});
  filename: string | undefined = '';
  candidate: Candidate | undefined ;

  constructor(private candidateService: CandidateService, private route: ActivatedRoute, public http: HttpClient,
              private dfs: DynamicFormService, public fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/forms/candidate.json').subscribe((formModelJson: any) => {
      this.formModel = this.dfs.fromJSON(formModelJson);
      this.formGroup = this.dfs.createFormGroup(this.formModel);
    });
    this.candidateService.getCandidate(this.route.snapshot.paramMap.get('id')).subscribe((details) => {
      this.candidate = details;
      this.formModel.forEach(f => {
        this.formGroup.controls[f.id].disable();
        // @ts-ignore
        if (f.id !== 'cv_file') {
          // @ts-ignore
          this.formGroup.controls[f.id].setValue(details[f.id]);
        }
      });
      this.filename = details.cv_file.split('/')[details.cv_file.split('/').length - 1];
    });
  }

  Confirm = () => {
    // @ts-ignore
    this.candidate?.application_status = 'Confirmed';
    this.candidateService.patchCandidate(this.candidate?.id, {application_status: 'Confirmed'}).subscribe((edited) => {
      this.router.navigate([`/admin/candidate/list/`]);
    });

  }
  reject = () => {
    // @ts-ignore
    this.candidate?.application_status = 'Rejected';
    this.candidateService.patchCandidate(this.candidate?.id, {application_status: 'Rejected'}).subscribe((edited) => {
      this.router.navigate([`/admin/candidate/list/`]);
    });
  }

}
