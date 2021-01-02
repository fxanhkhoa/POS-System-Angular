import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

	profileForm: FormGroup;

    constructor() {
		this.profileForm = new FormGroup({
			phone: new FormControl('', []),
			address: new FormGroup({
				street: new FormControl('', []),
				ward: new FormControl('', []),
				district: new FormControl('', []),
				city: new FormControl('', []),
				nation: new FormControl('', [])
			})
		});
	}

    ngOnInit(): void {}
}
