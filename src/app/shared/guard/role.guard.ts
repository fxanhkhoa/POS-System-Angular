import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/view/auth/service/auth.service';
import { AuthCookie } from '../enum/cookie.enum';
import { ToastService } from '../service/toast.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private spinner: NgxSpinnerService,
        private toastService: ToastService,
        private translate: TranslateService,
        private cookieService: CookieService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const roles = this.authService.roles;
        if (!this.cookieService.get(AuthCookie.REFRESH_TOKEN)) {
            this.toastService.showError(
                this.translate.instant('please-login'),
                this.translate.instant('need-login-to-use-feature'),
                1500
            );
            this.router.navigate(['auth', 'login']);
            return false;
        }
        if (roles.length === 0) {
            this.router.navigate(['auth', 'signup']);
            return false;
        }

        if (!route.data.roles) {
            return true;
        }

        if (roles.length > 0 && !this.checkRoles(route.data.roles, roles)) {
            this.router.navigate(['information', 'forbidden']);
            return false;
        }
        return true;
    }

    checkRoles(listRoles: string[], userRoles: string[]) {
        let result = false;
        userRoles.forEach((element) => {
            if (listRoles.includes(element)) {
                result = true;
            }
        });
        return result;
    }
}
