import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

import { UserSettingComponent } from './user-setting.component';

const routes: Routes = [
  {
    path: '',
    component: UserSettingComponent,
    children: [
      { path: '', redirectTo: 'profile-management' },
      { path: 'profile-management', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingRoutingModule {}
