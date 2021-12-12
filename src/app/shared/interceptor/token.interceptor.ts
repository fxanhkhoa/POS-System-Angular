import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/view/auth/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { IdTokenResult } from 'firebase/auth';
import { AuthCookie } from '../enum/cookie.enum';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private cookiesService: CookieService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const idToken = this.cookiesService.get(AuthCookie.ID_TOKEN);
        let headers = request.headers;
        if (request.url.indexOf('googleapis') === -1) {
            headers = headers.append('Authorization', `Bearer ${idToken}`);
        }
        const requestCloned = request.clone({
            headers
        });
        return next.handle(requestCloned);
    }
}
