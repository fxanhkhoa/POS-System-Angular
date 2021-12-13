import { Component, Inject, OnInit } from '@angular/core';
import {
    MatSnackBarRef,
    MAT_SNACK_BAR_DATA
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-confirm-snackbar',
    templateUrl: './confirm-snackbar.component.html',
    styleUrls: ['./confirm-snackbar.component.scss']
})
export class ConfirmSnackbarComponent {
    constructor(
        public snackBarRef: MatSnackBarRef<ConfirmSnackbarComponent>,
        @Inject(MAT_SNACK_BAR_DATA)
        public data: { mainMsg: string; subMsg: string }
    ) {}

    onCancel() {
        this.snackBarRef.dismiss();
    }

    onConfirm() {}
}
