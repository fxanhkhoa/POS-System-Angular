import { Subscription, Subject } from 'rxjs';
import { OnDestroy, Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Injectable()
export abstract class BaseComponent implements OnDestroy {
  // tslint:disable-next-line:variable-name
  matcher = new MyErrorStateMatcher();
  public _subscription = new Subscription();
  public loading: {
    [key: string]: boolean
  } = {};
  public ngDestroyed$ = new Subject();
  public ngOnDestroy() {
    this._subscription.unsubscribe();
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }
  public trackByIndex(index: number, item: any) {
    return index;
  }
  public trackById(index: number, item: any) {
    return item._id || item.id;
  }
}