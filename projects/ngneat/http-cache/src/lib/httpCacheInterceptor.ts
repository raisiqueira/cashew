import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpCacheFacade } from './httpCache';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private cache: HttpCacheFacade) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.cache.isCacheable(request) === false) {
      return next.handle(request);
    }

    if (this.cache.isCached(request)) {
      return of(this.cache.get(request));
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(request, event);
        }
      }),
    );
  }
}