import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    appitems: any = [];

    config = {
        paddingAtStart: true,
        interfaceWithRoute: true,
        classname: 'my-custom-class',
        listBackgroundColor: `transparent`,
        fontColor: `rgba(0, 0, 0, 0.9)`,
        backgroundColor: `rgba(167, 199, 235, 0.5)`,
        selectedListFontColor: `#ff4081`,
        highlightOnSelect: true,
        collapseOnSelect: true,
        useDividers: false,
        rtlLayout: false
    };

    constructor(private translate: TranslateService, private router: Router) {}

    ngOnInit(): void {
        this.initMenu();
    }

    initMenu() {
        console.log(this.translate.instant('my-shop'));
        this.translate
            .get(['my-shop', 'shop', 'product', 'invoice'])
            .pipe(take(1))
            .subscribe((res) => {
                console.log(res);
                this.appitems = [
                    {
                        label: 'POS',
                        imageIcon: 'favicon.ico',
                        link: 'http://pos-system.ddns.net',
                        externalRedirect: true,
                        hrefTargetType: '_blank' // _blank|_self|_parent|_top|framename
                    },
                    {
                        label: res['my-shop'],
                        icon: 'storefront',
                        items: [
                            {
                                label: res['shop'],
                                icon: 'local_mall',
                                activeIcon: 'business_center',
                                onSelected: () => {
                                    this.router.navigate(['shop']);
                                }
                            },
                            {
                                label: res['product'],
                                icon: 'inventory_2',
                                activeIcon: 'inventory',
                                onSelected: () => {
                                    this.router.navigate(['product']);
                                }
                            },
                            {
                                label: res['invoice'],
                                icon: 'receipt',
                                activeIcon: 'receipt',
                                onSelected: () => {
                                    this.router.navigate(['invoice']);
                                }
                            }
                        ]
                    }
                ];
            });
    }

    selectedItem(event: any) {
        console.log(event);
    }

    menuIsReady(event: any) {
        console.log(event);
    }

    selectedLabel(event: any) {
        console.log(event);
    }
}
