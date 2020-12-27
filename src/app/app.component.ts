import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginDialogComponent } from './authentication/login-dialog/login-dialog.component';
import { AuthService } from './services/authentication/auth.service';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated <=> default', animate('500ms ease-out')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @HostBinding('class') classes = ``;
  title = 'POS-System-Angular';
  state = 'default';
  isLogin = false;
  environmentMode: string = '';
  constructor(
    private environmentService: EnvironmentService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.environmentService.environmentMode$.subscribe((res) => {
      this.environmentMode = res;
      this.classes = `${this.environmentMode} main-background`;
    });
    authService.isLoggedIn().subscribe((res) => (this.isLogin = res));
  }

  ToggleNavIcon() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }

  OpenLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
