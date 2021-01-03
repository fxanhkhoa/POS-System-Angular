import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserSettingRoutingModule } from './user-setting-routing.module';
import { UserSettingComponent } from './user-setting.component';
import { ProfileComponent } from './profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [UserSettingComponent, ProfileComponent],
    imports: [
        CommonModule,
        UserSettingRoutingModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatButtonToggleModule,
        MatInputModule,
        MatFormFieldModule,
        TranslateModule.forChild(),
    ],
})
export class UserSettingModule {}
