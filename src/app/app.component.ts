import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './services/environment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated <=> default', animate('500ms ease-out')),
    ])
  ]
})
export class AppComponent {
  title = 'POS-System-Angular';
  state = 'default';
  environmentMode: Observable<string>;
  constructor(private environmentService: EnvironmentService) {
    this.environmentMode = this.environmentService.environmentMode$;
  }

  toggleNavIcon() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
}
