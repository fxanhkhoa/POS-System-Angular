import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    constructor(private translate: TranslateService) {}

    ngOnInit(): void {
        console.log(this.translate.instant('my-shop'));
    }
}
