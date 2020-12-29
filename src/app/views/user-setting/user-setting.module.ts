import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingRoutingModule } from './user-setting-routing.module';
import { UserSettingComponent } from './user-setting.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [UserSettingComponent, ProfileComponent],
  imports: [CommonModule, UserSettingRoutingModule],
})
export class UserSettingModule {}
