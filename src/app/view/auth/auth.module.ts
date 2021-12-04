import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './component/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {
    AngularFireAuth,
    AngularFireAuthModule
} from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [AuthComponent, LoginComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [AngularFireAuth],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
