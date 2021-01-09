import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { FirebaseUser } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { ErrorSnackbarComponent } from 'src/app/shared/views/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from 'src/app/shared/views/success-snackbar/success-snackbar.component';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends BaseComponent implements OnInit {
    profileForm: FormGroup;
    user$: Observable<FirebaseUser | null | undefined>;

    constructor(
        private auth: AuthService,
        private userService: UserService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
        super();
        this.user$ = new Observable();
        this.profileForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(8),
            ]),
            address: new FormGroup({
                street: new FormControl('', []),
                ward: new FormControl('', []),
                district: new FormControl('', []),
                city: new FormControl('', []),
                nation: new FormControl('', []),
            }),
        });
    }

    ngOnInit(): void {
        this.user$ = this.auth.firebaseUser$;
        this.user$.pipe(takeUntil(this.ngDestroyed$))
        .subscribe(
            res => {
                this.profileForm.controls['name'].setValue(res?.displayName);
                this.profileForm.controls['email'].setValue(res?.email);
            }
        )
    }

    signUp() {
        this.spinner.show();
        this.userService
            .editUser({ ...this.profileForm.value, shops: [] })
            .pipe(finalize(() => {this.spinner.hide()}))
            .subscribe((res) => {
                if (res.result) {
                    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
                        duration: 2 * 1000,
                        data: {
                            mainMsg: 'Sign Up Successful',
                            subMsg: 'Thank you for joining us'
                        }
                    });
                    this._snackBar._openedSnackBarRef
                        ?.afterDismissed()
                        .pipe(takeUntil(this.ngDestroyed$))
                        .subscribe((resSnack) => {
                            this.router.navigate(['home']);
                        });
                }
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                this._snackBar.openFromComponent(ErrorSnackbarComponent, {
                    duration: 2 * 1000,
                    data: {
                        mainMsg: `Sign Up Fail: ${err.status} - ${err.statusText}`,
                        subMsg: 'Please try again'
                    }
                });
            });
    }
}
