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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
        private http: HttpClient,
        private toastService: ToastService
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
                        if (this.authService.user) {
                            return from(
                                this.authService.user?.getIdTokenResult(
                                    true
                                ) as Promise<IdTokenResult>
                            ).pipe(
                                switchMap((res: IdTokenResult) => {
                                    this.cookieService.set(
                                        AuthCookie.ID_TOKEN,
                                        res.token
                                    );
                                    return this.http.request(request);
                                    // return new Observable<any>();
                                })
                            );
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
