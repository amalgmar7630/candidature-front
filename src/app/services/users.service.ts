import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRoot = 'http://127.0.0.1:8000/';


  constructor(public http: HttpClient) {
  }

  getUsers = (params?: any) => {
    return this.http.get<any>(this.apiRoot.concat('users/'), {params});
  }
  getUser = (id: any) => {
    return this.http.get<any>(this.apiRoot.concat('users/' + `${id}` + '/'), );
  }
}
