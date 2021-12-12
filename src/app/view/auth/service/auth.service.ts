import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { AuthCookie } from 'src/app/shared/enum/cookie.enum';
import {
    IProfile,
    IProfileResponse,
    IResponseTokenFromRefreshToken
} from 'src/app/shared/interface/user.interface';
import { environment } from 'src/environments/environment';

const endPoint = `${environment.endPoint}/users`;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: firebase.User | null = null;
    userProfile: IProfile | null = null;
    roles: string[] = [];
    constructor(
        private http: HttpClient,
        private auth: AngularFireAuth,
        private cookieService: CookieService
    ) {}

    getProfile(): Observable<IProfile> {
        const url = `${endPoint}/profile`;
        return this.http.get<IProfileResponse>(url).pipe(
            map((res) => {
                this.userProfile = res as unknown as IProfile;
                this.roles = res.roles.split(' ');
                return {
                    ...res,
                    shops: res.shops ? res.shops.split(' ') : []
                };
            })
        );
    }

    async setUserAndLogin() {
        const url = `https://securetoken.googleapis.com/v1/token?key=${environment.firebase.apiKey}`;
        let body = new URLSearchParams();
        body.set('grant_type', 'refresh_token');
        body.set(
            'refresh_token',
            this.cookieService.get(AuthCookie.REFRESH_TOKEN)
        );
        let options = {
            headers: new HttpHeaders().set(
                'Content-Type',
                'application/x-www-form-urlencoded'
            )
        };
        try {
            const result = await firstValueFrom(
                this.http.post<IResponseTokenFromRefreshToken>(
                    url,
                    body.toString(),
                    options
                )
            );
            this.cookieService.set(AuthCookie.ID_TOKEN, result.id_token);
            this.cookieService.set(
                AuthCookie.REFRESH_TOKEN,
                result.refresh_token
            );
        } catch (error) {
            console.log(error);
        }
    }
}
