import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-fill-info',
    templateUrl: './user-fill-info.component.html',
    styleUrls: ['./user-fill-info.component.scss']
})
export class UserFillInfoComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {}
}
