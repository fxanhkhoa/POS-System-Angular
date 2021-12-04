import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private translate: TranslateService,
        private titleService: Title
    ) {
        const userLang = navigator.language;
        translate.use(userLang);
    }

    ngOnInit(): void {
        this.setTitle();
        this.setTheme('dark-theme');
    }

    setTheme(className: string) {
        let body = document.getElementsByTagName('BODY')[0];
        body.classList.remove('dark-theme');
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
}
