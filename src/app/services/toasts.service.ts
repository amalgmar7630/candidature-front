import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  toasts: any[] = [];
  defaultOptions = {
    delay: 6000,
    autohide: true
  };

  constructor() {
  }

  // tslint:disable-next-line:typedef
  show(options: any) {
    this.toasts.push(options);
  }
  // tslint:disable-next-line:typedef
  alert(options: any) {
    const allOptions = Object.assign({
      classname: 'bg-white border border-warning text-warning pointer',
      icon: 'fa fa-exclamation-triangle fa-lg text-warning p-1 pr-3'
    }, this.defaultOptions, options);
    this.show(allOptions);
  }

  // tslint:disable-next-line:typedef
  info(options: any) {
    const allOptions = Object.assign({
      classname: 'bg-white border border-info text-info pointer',
      icon: 'fa fa-info-circle fa-lg text-info p-1 pr-3'
    }, this.defaultOptions, options);
    this.show(allOptions);
  }

  // tslint:disable-next-line:typedef
  success(options: any) {
    const allOptions = Object.assign({
      classname: 'bg-white border border-success text-success pointer',
      icon: 'fa fa-check-circle fa-lg text-success p-1 pr-3'
    }, this.defaultOptions, options);
    this.show(allOptions);
  }

  // tslint:disable-next-line:typedef
  error(options: any) {
    const allOptions = Object.assign({
      classname: 'border border-danger text-danger pointer',
      icon: 'fa fa-times-circle fa-lg text-danger p-1 pr-3'
    }, this.defaultOptions, options);
    this.show(allOptions);
  }
}
