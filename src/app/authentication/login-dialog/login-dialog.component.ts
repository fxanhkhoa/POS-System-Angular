import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent extends BaseComponent implements OnInit {
    constructor(
        public auth: AuthService,
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        private userService: UserService,
        private router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.auth
            .LoggedUser()
            .pipe(takeUntil(this.ngDestroyed$))
            .subscribe((res) => {
                if (res !== null) {
                    this.userService.checkExisted().subscribe((resExisted) => {
                        if (resExisted.result) {
                            this.dialogRef.close(true);
                        } else {
                            this.dialogRef.close(true);
                            this.router.navigate(['login','sign-up']);
                        }
                    });
                }
            });
    }
}
