import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiRoot = 'http://127.0.0.1:8000/';


  constructor(public http: HttpClient) {
  }

  getCandidates = (params?: any) => {
    return this.http.get<any>(this.apiRoot.concat('candidates/'), {params});
  }
  getCandidate = (id: any) => {
    return this.http.get<any>(this.apiRoot.concat('candidates/' + `${id}` + '/'), );
  }
  editCandidate = (id: any, body: any) => {
    return this.http.put<any>(this.apiRoot.concat('candidates/') + `${id}` + '/', body);
  }
  patchCandidate = (id: any, body: any) => {
    return this.http.patch<any>(this.apiRoot.concat('candidates/') + `${id}` + '/', body);
  }
  addCandidate = (body: any) => {
    return this.http.post<any>(this.apiRoot.concat('candidates/'), body);
  }
}
