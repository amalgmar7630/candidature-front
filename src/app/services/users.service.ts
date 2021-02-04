import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {flatMap} from 'rxjs/operators';
import {of} from 'rxjs';

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
  download(endPoint: string, fileName: string) {
    return this.http.get(endPoint, {responseType: 'blob'}).pipe(flatMap((response: Blob) => {
      const blob = new Blob([response], {type: response.type});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
        downloadLink.setAttribute('type', 'hidden');
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
      }
      return of({});
    }));
  }
}
