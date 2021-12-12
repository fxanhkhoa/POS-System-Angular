import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { AuthService } from './view/auth/service/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    currentPage = 'home';
    roles: string[] = [];
    isSideNavOpen = false;
    constructor(
        private translate: TranslateService,
        private titleService: Title,
        private authService: AuthService,
        private router: Router
    ) {
        const userLang = navigator.language;
        translate.use(userLang);
    }

    ngOnInit(): void {
        this.setTitle();
        const theme = localStorage.getItem('theme');
        this.setTheme(theme ? theme : 'light-theme');
        this.roles = this.authService.roles;
    }

    setTheme(className: string) {
        let body = document.getElementsByTagName('BODY')[0];
        body.classList.remove('dark-theme');
        body.classList.remove('light-theme');
        body.classList.add(className);
    }

    setTitle() {
        this.translate
            .get('app.title')
            .pipe(take(1))
            .subscribe((res: string) => {
                this.titleService.setTitle(res);
            });
    }

    navigate(item: string) {
        switch (item) {
            case 'home':
                this.router.navigate(['information', 'home']);
                this.currentPage = 'home';
                break;
            case 'about':
                this.router.navigate(['information', 'about']);
                this.currentPage = 'about';
                break;
            default:
                break;
        }
    }

    onOpenChange(event: boolean) {
        this.isSideNavOpen = event;
    }
}
