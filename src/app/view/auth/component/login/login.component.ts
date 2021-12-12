import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { CookieService } from 'ngx-cookie-service';
import { AuthCookie } from 'src/app/shared/enum/cookie.enum';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(
        private auth: AngularFireAuth,
        private cookieService: CookieService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getProfile();
    }

    login() {
        const result = this.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        );
        result.then((res) => {
            if (res.user) {
                this.cookieService.set(
                    AuthCookie.REFRESH_TOKEN,
                    res.user?.refreshToken
                );
            }
            res.user?.getIdTokenResult().then((token) => {
                console.log(token);
                this.cookieService.set(AuthCookie.ID_TOKEN, token.token);
            });
            this.authService.user = res.user;
        });
    }

    getProfile() {
        if (this.authService.roles.length > 0) {
            this.router.navigate(['information', 'home']);
            return;
        }
        this.authService.getProfile().subscribe((res) => {
            if (res) {
                console.log(res);
                this.router.navigate(['information', 'home']);
            }
        });
    }
}
