import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirebaseUser } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    profileForm: FormGroup;
    user$: Observable<FirebaseUser | null | undefined>;

    constructor(private auth: AuthService) {
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

    ngOnInit(): void {}

    signUp() {
      console.log(this.profileForm.value);
    }
}
