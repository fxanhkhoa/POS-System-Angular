import {
    APP_INITIALIZER,
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from './shared/shared.module';
import { CookieService } from 'ngx-cookie-service';
import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';
import { AuthService } from './view/auth/service/auth.service';
import { AppInitService } from './shared/service/app-init.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initializeRootApp(appInitService: AppInitService) {
    return (): Promise<any> => {
        return appInitService.Init();
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        TranslateModule.forRoot({
            defaultLanguage: 'en-US',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        SharedModule
    ],
    exports: [TranslateModule],
    providers: [
        CookieService,
        AuthService,
        AppInitService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeRootApp,
            deps: [AppInitService, CookieService, AuthService],
            multi: true
        },
        { provide: USE_DEVICE_LANGUAGE, useValue: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
