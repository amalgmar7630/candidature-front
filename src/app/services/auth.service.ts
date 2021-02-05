// auth.service.ts

import { Injectable } from '@angular/core';
import {HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap, shareReplay} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}
@Injectable()
export class AuthService {

  private apiRoot = 'http://127.0.0.1:8000/auth/';

  constructor(private http: HttpClient) { }

  private setSession = (authResult: any) => {
    const token = authResult.token;
    const payload = jwt_decode(token) as JWTPayload;
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user_id', String(payload.user_id));
  }

  get token(): string {
    return localStorage.getItem('token') as string;
  }

  login = (body: any) => {
    return this.http.post(
      this.apiRoot.concat('login/'),
      body
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  signup = (body: any) => {
    return this.http.post(
      this.apiRoot.concat('signup/'),
      body
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }
  // tslint:disable-next-line:typedef
  // @ts-ignore
  refreshToken = () => {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  // tslint:disable-next-line:typedef
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration != null) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return moment();
  }
  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
  isLoggedIn = () => {
    return moment().isBefore(this.getExpiration());
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}


