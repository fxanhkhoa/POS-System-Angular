import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './views/home/home.component';
import { AuthService } from './services/authentication/auth.service';
import { AuthGuard } from './services/authentication/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from "ngx-spinner";

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { LoginDialogComponent } from './authentication/login-dialog/login-dialog.component';
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { CustomInterceptor } from './services/authentication/custom.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginDialogComponent,
        SignUpComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule,
        MatSelectModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        NgxSpinnerModule
    ],
    exports: [TranslateModule],
    providers: [
        AuthService,
        AuthGuard,
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true,
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent],
})
export class AppModule {}
