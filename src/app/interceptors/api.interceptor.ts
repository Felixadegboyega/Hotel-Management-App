import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem("token") != null){
      let token = JSON.parse(localStorage.getItem("token"));
      return next.handle(request.clone({headers: request.headers.set('Authorization',`Bearer ${token}`)}));
    } else {
      return next.handle(request);
    }
  }
}
