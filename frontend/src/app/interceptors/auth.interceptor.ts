import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { TokenTypes } from '../model/token-types';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthServiceService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    let bearerToken = this.authService.getToken(TokenTypes.AUTHTOKEN);
    if (bearerToken != null) {
      authReq = authReq.clone({ headers: authReq.headers.set('Authorization', 'Bearer ' + bearerToken) });
    }
    return next.handle(authReq).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401 || err.url?.endsWith('user/login')) {
            return;
          }
          this.authService.clearTokens();
          this.router.navigate(['login']);
        }
      }));
  }
}



export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];