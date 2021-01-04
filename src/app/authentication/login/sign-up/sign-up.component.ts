import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    profileForm: FormGroup;
    constructor() {
        this.profileForm = new FormGroup({
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
