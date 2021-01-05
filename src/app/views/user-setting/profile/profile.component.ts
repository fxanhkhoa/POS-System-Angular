import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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

    check() {
        console.log(this.profileForm)
    }
}
