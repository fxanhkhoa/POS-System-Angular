import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'POS-System-Angular';
  environmentMode: Observable<string>;
  constructor(private environmentService: EnvironmentService) {
    this.environmentMode = this.environmentService.environmentMode$;
  }
}
