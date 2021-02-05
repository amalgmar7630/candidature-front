import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Candidate} from '../../../interfaces/candidate';
import {CandidateService} from '../../../services/candidates.service';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {assignValidations, getRandomInt} from '../../../utils/util-functions';
import {ToastsService} from '../../../services/toasts.service';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective | undefined;
  searchText = '';
  previous = '';
  formModel: DynamicFormModel = [];
  formGroup: FormGroup = new FormGroup({});
  file: File | undefined;
  error: any;
  filename: string | undefined = '';
  selectedCandidate: Candidate | undefined;
  public modalRef: NgbModalRef | undefined;

  constructor(private candidateService: CandidateService, private modalService: NgbModal, public http: HttpClient,
              // tslint:disable-next-line:max-line-length
              private dfs: DynamicFormService, public fb: FormBuilder, private router: Router, private ngbModal: NgbModal, private toastService: ToastsService) {
  }

  // tslint:disable-next-line:typedef
  @HostListener('input') oninput() {
    this.searchItems();
  }


  ngOnInit(): void {
    this.http.get<any[]>('assets/forms/candidate.json').subscribe((formModelJson: any) => {
      this.formModel = this.dfs.fromJSON(formModelJson);
      this.formGroup = this.dfs.createFormGroup(this.formModel);
    });
    this.candidateService.getCandidates().subscribe((results: Candidate[]) => {
      this.candidates = results;
      this.candidates = this.candidates.map(obj => ({ ...obj, filename: obj.cv_file.split('/')[obj.cv_file.split('/').length - 1] }));
      // @ts-ignore
      this.mdbTable.setDataSource(this.candidates);
      // @ts-ignore
      this.previous = this.mdbTable.getDataSource();
    });
  }

  /**
   * Search in table by typed string
   */
  searchItems = () => {
    // @ts-ignore
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      // @ts-ignore
      this.mdbTable.setDataSource(this.previous);
      // @ts-ignore
      this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      // @ts-ignore
      this.candidates = this.mdbTable.searchLocalDataBy(this.searchText);
      // @ts-ignore
      this.mdbTable.setDataSource(prev);
    }
  }

  previewCandidate = (candidate: Candidate) => {
    this.router.navigate([`/admin/candidate/details/${candidate.id}/`]);
  }
  addCandidate = (content: any) => {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  updateCandidate = (candidate: Candidate, content: any) => {
    this.selectedCandidate = candidate;
    this.filename = candidate.cv_file.split('/')[candidate.cv_file.split('/').length - 1];
    this.formModel.forEach(f => {
      // @ts-ignore
      if (f.id !== 'cv_file') {
        // @ts-ignore
        this.formGroup.controls[f.id].setValue(candidate[f.id]);
      } else {
        this.formGroup.controls[f.id].clearValidators();
      }
    });
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  saveCandidate = () => {
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
      if (!this.selectedCandidate) {
        const id = getRandomInt(1000);
        // @ts-ignore
        formData.append('id', id);
        this.candidateService.addCandidate(formData).subscribe((final) => {
          const newCandidate = {id, ...final};
          this.candidates = [...this.candidates, newCandidate];
          this.candidates = this.candidates.map(obj => ({ ...obj, filename: obj.cv_file.split('/')[obj.cv_file.split('/').length - 1] }));
          this.ngbModal.dismissAll();
        }, errorObj => {
          Object.keys(errorObj.error).forEach((key) => {
            this.toastService.error({title: key, text: errorObj.error[key]});
          });
        });
      } else {
        // @ts-ignore
        this.candidateService.patchCandidate(this.selectedCandidate.id, formData).subscribe((final) => {
          // @ts-ignore
          const index =  this.candidates.findIndex(t => t.id === this.selectedCandidate.id);
          this.candidates[index] = final;
          this.candidates = this.candidates.map(obj => ({ ...obj, filename: obj.cv_file.split('/')[obj.cv_file.split('/').length - 1] }));
          // @ts-ignore
          this.modalRef.close();
        }, errorObj => {
          Object.keys(errorObj.error).forEach((key) => {
            this.toastService.error({title: key, text: errorObj.error[key]});
          });
        });
      }
    } else {
      this.formGroup.markAllAsTouched();
      this.dfs.detectChanges();
      assignValidations(this.formModel);
    }
  }
  onChange = (event: any) => {
    if (event.$event.target.files && event.$event.target.files.length > 0) {
      this.file = event.$event.target.files[0];
      this.filename = this.file?.name;
    }
  }
}
