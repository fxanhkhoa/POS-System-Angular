import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent extends BaseComponent implements OnInit {
  constructor(public auth: AuthService, public dialogRef: MatDialogRef<LoginDialogComponent>) {
    super();
  }

  ngOnInit(): void {
    this.auth
      .LoggedUser()
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((res) => {
        console.log(res);
        if (res !== null) {
          this.dialogRef.close(true);
        }
      });
  }
}
