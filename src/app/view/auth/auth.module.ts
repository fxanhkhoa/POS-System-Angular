import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './component/login/login.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [AuthComponent, LoginComponent],
    imports: [CommonModule, AuthRoutingModule, MatCardModule]
})
export class AuthModule {}
