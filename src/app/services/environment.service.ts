import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private environmentMode = new BehaviorSubject<string>('dark');
  public environmentMode$ = this.environmentMode.asObservable();
  constructor() { 
    
  }
}
