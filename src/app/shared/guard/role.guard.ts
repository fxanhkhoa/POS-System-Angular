import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/view/auth/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private spinner: NgxSpinnerService
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

        if (!route.data.roles) {
            return true;
        }
        console.log(roles, this.checkRoles(route.data.roles, roles));
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
