import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { mainMsg: string; subMsg: string }
    ) {}

    ngOnInit(): void {}

    onCancel() {
        this.dialogRef.close(false);
    }

    onConfirm() {
        this.dialogRef.close(true);
    }
}
