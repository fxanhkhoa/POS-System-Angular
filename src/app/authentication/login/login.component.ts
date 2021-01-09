import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { IUserDTO } from 'src/app/interfaces/api.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
    constructor(
        public auth: AuthService,
        private userService: UserService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
        super();
    }

    ngOnInit(): void {
        this.auth
            .LoggedUser()
            .pipe(take(2), finalize(() => {this.spinner.hide();}))
            .subscribe((res) => {
                console.log('call Logged User', res);
                this.spinner.show();
                if (res !== null) {
                    this.userService.checkExisted()
                    .pipe(take(1))
                    .subscribe((resExisted) => {
                        console.log(resExisted);
                        if (resExisted.result === true) {
                            this.spinner.hide();
                            this.router.navigate(['']);
                        } else {
                            const userDto: IUserDTO = {
                                name: res?.displayName,
                                email: res?.email,
                                shops: [],
                                phone: '',
                                address: {},
                            };
                            this.spinner.show();
                            this.userService
                                .registerUser(userDto)
                                .pipe(finalize(() => {this.spinner.hide();}))
                                .subscribe((res) => {
                                    this.spinner.hide();
                                    if (res.result) {
                                        this.router.navigate(['login', 'sign-up']);
                                    } else {
                                        // * SHOW ERROR
                                    }
                                });
                        }
                    });
                } else {
                    this.spinner.hide();
                }
            });
    }
}
