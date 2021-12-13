import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/view/auth/service/auth.service';
import { AuthCookie } from '../enum/cookie.enum';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {
    constructor(
        private cookieService: CookieService,
        private authService: AuthService
    ) {}

    async Init() {
        return new Promise<void>(async (resolve, reject) => {
            if (!this.cookieService.get(AuthCookie.REFRESH_TOKEN)) {
                resolve();
                return;
            }
            try {
                await firstValueFrom(this.authService.getProfile());
            } catch (error) {
                await this.authService.setUserAndLogin();
                await this.authService.getProfile();
            }
            resolve();
        });
    }
}
