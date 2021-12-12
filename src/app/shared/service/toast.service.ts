import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from '../component/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from '../component/success-snackbar/success-snackbar.component';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private snackBar: MatSnackBar) {}

    showSuccess(mainMsg: string, subMsg: string, duration: number) {
        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            duration,
            data: {
                mainMsg,
                subMsg
            }
        });
    }

    showError(mainMsg: string, subMsg: string, duration: number) {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            duration,
            data: {
                mainMsg,
                subMsg
            }
        });
    }
}
