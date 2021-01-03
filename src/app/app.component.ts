import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LoginDialogComponent } from './authentication/login-dialog/login-dialog.component';
import { AuthService } from './services/authentication/auth.service';
import { EnvironmentService } from './services/environment.service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('rotatedState', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(-180deg)' })),
            transition('rotated <=> default', animate('500ms ease-out')),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    @HostBinding('class') classes = ``;
    title = 'POS-System-Angular';
    state = 'default';
    isLogin = false;
    profileImage = '';
    environmentMode: string = '';
    selectedLanguage = 'en';
    languages = [
        { name: 'English', value: 'en' },
        { name: 'Vietnamese', value: 'vi' },
    ];
    curentLanguage = 'en';
    constructor(
        private environmentService: EnvironmentService,
        private authService: AuthService,
        public dialog: MatDialog,
        private translate: TranslateService
    ) {
        translate.addLangs(['en', 'vi']);
        this.curentLanguage = translate.getDefaultLang();
        this.environmentService.getLocation().subscribe((res) => {
            // translate.setDefaultLang(res.languages[0].name);
            translate.setDefaultLang('en');
        });
        this.environmentService.environmentMode$.subscribe((res) => {
            this.environmentMode = res;
            this.classes = `${this.environmentMode} main-background`;
        });
        authService.LoggedUser().subscribe((res) => {
            this.isLogin = !!res;
            this.profileImage = res?.photoURL ? res?.photoURL : '';
        });
    }

    ToggleNavIcon() {
        this.state = this.state === 'default' ? 'rotated' : 'default';
    }

    OpenLoginDialog() {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
            width: '50vw',
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            if (result) {
            }
        });
    }

    changeLanguage(lang: any) {
        this.translate.setDefaultLang(lang.value);
    }

    LogOut() {
        this.authService.signOut();
    }
}
