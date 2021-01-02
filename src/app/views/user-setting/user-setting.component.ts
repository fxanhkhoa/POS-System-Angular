import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseUser } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {

  user$: Observable<FirebaseUser | null | undefined>;
  vertical = true;

  constructor(private auth: AuthService) { 
    this.user$ = new Observable();
  }

  ngOnInit(): void {
    this.user$ = this.auth.firebaseUser$;
  }

  changeVerticalButtonToggle() {
    this.vertical = !this.vertical;
  }
}
