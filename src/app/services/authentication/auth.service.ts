import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FirebaseUser, IUser } from 'src/app/interfaces/user.model';
import { switchMap, take } from 'rxjs/operators';
import firebase from 'firebase/app';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseUser$: Observable<FirebaseUser | null | undefined>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private cookieService: CookieService
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.firebaseUser$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        console.log(user);
        if (user) {
          return this.afs.doc<FirebaseUser>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const idToken = this.cookieService.get('idToken');
    console.log(idToken)
    let credential;
    if (idToken) {
        credential = await this.afAuth.signInWithCustomToken(idToken);
        console.log(credential)
    }
    else {
        credential = await this.afAuth.signInWithPopup(provider);
    }
    console.log(credential);
    
    return this.updateUserData(credential);
  }

  private updateUserData(credential: any) {
    console.log(credential.user);
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<FirebaseUser> = this.afs.doc(
      `users/${credential.user.uid}`
    );

    // Set cookies for id_token
    this.afAuth.idToken.pipe(take(1)).subscribe(
        res => {
            console.log(res);
            this.cookieService.set( 'idToken', res as string );
        }
    )
    // Set cookies for refreshToken
    this.cookieService.set( 'refreshToken', credential.user.refreshToken );

    const data = {
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: credential.user.displayName,
      photoURL: credential.user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
