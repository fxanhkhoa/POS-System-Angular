import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    private environmentMode = new BehaviorSubject<string>('dark-theme');
    public environmentMode$ = this.environmentMode.asObservable();
    public locationlanguage: string = '';
    constructor(private http: HttpClient) {}

    getLocation() {
        return this.http.get<any>(`https://api.ipdata.co?api-key=test`).pipe(
            map((res) => {
                res.languages[0].name = this.mapLanguage(res.languages[0].name);
                return res;
            })
        );
    }

    mapLanguage(lang: string) {
        switch (lang) {
            case 'Vietnamese':
                return 'vi';
        }
        return '';
    }

    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    }
}
