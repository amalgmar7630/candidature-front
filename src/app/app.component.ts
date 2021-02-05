import { Component } from '@angular/core';
import {ToastsService} from './services/toasts.service';
import {UserService} from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  iSuperUser = false;
  constructor(public toastService: ToastsService, private userService: UserService) {
    // tslint:disable-next-line:radix variable-name
    const user_id = parseInt(localStorage.getItem('user_id') as string);
    this.userService.getUser(user_id).subscribe((results) => {
      this.iSuperUser = results.is_superuser;
    });
  }
  title = 'application-test';
  logout = () => {
    this.iSuperUser = false;
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
}
