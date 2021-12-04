import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private auth: AngularFireAuth) {}

    ngOnInit(): void {}

    login() {
        const result = this.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        );
        console.log(result);
        result.then((res) => {
            localStorage.setItem('credential', JSON.stringify(res));
            console.log(res);
        });
    }
}
