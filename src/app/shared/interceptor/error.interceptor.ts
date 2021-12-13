import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpClient
} from '@angular/common/http';
import {
    catchError,
    from,
    Observable,
    retry,
    switchMap,
    throwError
} from 'rxjs';
import { AuthService } from 'src/app/view/auth/service/auth.service';
import { IdTokenResult } from 'firebase/auth';
import { CookieService } from 'ngx-cookie-service';
import { AuthCookie } from '../enum/cookie.enum';
import { ToastService } from '../service/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
        private http: HttpClient,
        private toastService: ToastService,
        private router: Router
    ) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `${error.error.message}`;
                } else {
                    if (error.status === 401) {
                        if (this.cookieService.get(AuthCookie.REFRESH_TOKEN)) {
                            return from(
                                this.authService.setUserAndLogin()
                            ).pipe(
                                switchMap((res: boolean) => {
                                    return this.http.request(request);
                                })
                            );
                        } else {
                            this.router.navigate(['auth', 'login']);
                        }
                    } else {
                        this.toastService.showError(
                            error.status.toString(),
                            error.statusText,
                            1500
                        );
                    }
                    errorMessage = `${error.status}`;
                }
                return throwError(() => error);
            }),
            retry(1)
        );
    }
}
