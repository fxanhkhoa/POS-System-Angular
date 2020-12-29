import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authentication/auth.guard';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./views/user-setting/user-setting.module').then(
        (m) => m.UserSettingModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
