import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
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
                    this.userService.checkExisted().subscribe((res) => {
                      console.log(res);
                        if (res.result) {
                            this.router.navigate(['']);
                        } else {
                            this.router.navigate(['sign-up']);
                        }
                    });
                }
            });
    }
}
