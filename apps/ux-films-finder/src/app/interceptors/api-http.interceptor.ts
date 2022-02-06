import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiHttpInterceptor implements ApiHttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    request = req.clone({
      setHeaders: {
        'X-API-KEY': '9b646f43-761c-4441-82d8-809c12f30bd6',
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request);
  }
}
