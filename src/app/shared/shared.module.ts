import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatPaginatorIntl,
    MatPaginatorModule
} from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { ConfirmSnackbarComponent } from './component/confirm-snackbar/confirm-snackbar.component';
import { ErrorSnackbarComponent } from './component/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from './component/success-snackbar/success-snackbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { SideMenuComponent } from './component/side-menu/side-menu.component';
import {
    MultilevelMenuService,
    NgMaterialMultilevelMenuModule
} from 'ng-material-multilevel-menu';

@Injectable({
    providedIn: 'root'
})
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
    constructor(private translate: TranslateService) {}
    changes = new Subject<void>();

    // For internationalization, the `$localize` function from
    // the `@angular/localize` package can be used.
    firstPageLabel = this.translate.instant('first-page');
    itemsPerPageLabel = this.translate.instant('item-per-page');
    lastPageLabel = this.translate.instant('last-page');

    // You can set labels to an arbitrary string too, or dynamically compute
    // it through other third-party internationalization libraries.
    nextPageLabel = this.translate.instant('next-page');
    previousPageLabel = this.translate.instant('previous-page');

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return this.translate.instant('page-1-of-1');
        }
        const amountPages = Math.ceil(length / pageSize);
        return `${this.translate.instant('page')} ${
            page + 1
        } ${this.translate.instant('of')} ${amountPages}`;
    }
}
@NgModule({
    declarations: [
        ConfirmDialogComponent,
        ConfirmSnackbarComponent,
        ErrorSnackbarComponent,
        SuccessSnackbarComponent,
        SideMenuComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatDialogModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatMomentDateModule,
        MatAutocompleteModule,
        TranslateModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgxSpinnerModule,
        NgMaterialMultilevelMenuModule,
        MatMenuModule
    ],
    exports: [
        HttpClientModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatDialogModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatSelectModule,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatMomentDateModule,
        TranslateModule,
        MatAutocompleteModule,
        SideMenuComponent,
        NgMaterialMultilevelMenuModule,
        MatMenuModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [MultilevelMenuService]
})
export class SharedModule {}
