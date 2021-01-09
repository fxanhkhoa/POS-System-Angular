import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FirebaseUser, IUser } from 'src/app/interfaces/user.model';
import { map, switchMap, take, tap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseUser$: Observable<FirebaseUser | null | undefined>;
  public token = '';
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.firebaseUser$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
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
    let credential;
    credential = await this.afAuth.signInWithPopup(provider);
    
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: any) {
    // console.log(user);
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<FirebaseUser> = this.afs.doc(
      `users/${user.uid}`
    );

    // Set cookies for refreshToken
    user?.getIdToken(true).then((idToken: string) => {
        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            idToken: idToken
        }
        this.token = idToken;
        return userRef.set(data, { merge: true });
    });
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  LoggedUser() {
    return this.firebaseUser$.pipe(
      map((user) => {
        return user;
      })
    );
  }
}
