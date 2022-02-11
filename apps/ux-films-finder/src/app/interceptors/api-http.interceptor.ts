import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { KinopoiskRequestModel } from '../models/film.model';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<KinopoiskRequestModel>,
    next: HttpHandler
  ): Observable<HttpEvent<KinopoiskRequestModel>> {
    const request = req.clone({
      setHeaders: {
        'X-API-KEY': '9b646f43-761c-4441-82d8-809c12f30bd6',
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request);
  }
}
